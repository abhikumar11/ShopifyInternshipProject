const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose"); 
const OrderModel = require("../models/OrderModel");
const nodemailer=require("nodemailer");
require("dotenv").config();

const rzp = new Razorpay({
  key_id: process.env.RAZORPAYKEYID,
  key_secret: process.env.RAZORPAYKEYSECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), 
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await rzp.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAYKEYSECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid Payment Signature" });
  }

  try {
    
    const existingOrder = await OrderModel.findOne({ "paymentInfo.id": razorpay_payment_id });
    if (existingOrder) {
      return res.status(200).json({ success: true, message: "Order already processed", orderId: existingOrder._id });
    }

    
    const newOrder = new OrderModel({
      customerId: orderDetails.customerId, 
      items: orderDetails.items.map(item => ({
        productId: item.productId, 
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: orderDetails.shippingAddress,
      totalAmount: orderDetails.totalAmount,
      paymentStatus: "paid",
      orderStatus: "placed",
      paymentInfo: {
        id: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "captured"
      }
    });

    await newOrder.save();

   
    try {
      const customer = await UserModel.findById(orderDetails.customerId);
      
      if (customer && customer.emailid) {
   
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE,
          auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });

 
        const itemsListHtml = orderDetails.items.map(item => `
          <div style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
            <span>${item.name} (x${item.quantity})</span>
            <span style="font-weight: bold;">₹${item.price * item.quantity}</span>
          </div>
        `).join('');

        const mailOptions = {
          from: `"Command Center Store" <${process.env.SMTP_MAIL}>`,
          to: customer.emailid,
          subject: `Order Success: #${newOrder._id.toString().slice(-6).toUpperCase()}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 15px;">
              <h2 style="color: #008060; border-bottom: 2px solid #008060; padding-bottom: 10px;">Order Confirmed!</h2>
              <p>Hi ${customer.name},</p>
              <p>Your payment was successful. We are now processing your order.</p>
              
              <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Order Summary:</h4>
                ${itemsListHtml}
                <div style="margin-top: 15px; text-align: right; font-size: 18px; font-weight: bold;">
                  Total Paid: ₹${orderDetails.totalAmount}
                </div>
              </div>

              <p style="font-size: 12px; color: #666;">Shipping to: ${orderDetails.shippingAddress}</p>
              <p style="margin-top: 20px; font-weight: bold;">Thank you for shopping with us!</p>
            </div>
          `,
        };

      
        await transporter.sendMail(mailOptions);
      }
    } catch (mailError) {
      console.error("Email dispatch failed:", mailError);
      
    }
   
    res.status(200).json({
      success: true,
      message: "Payment successful and order recorded",
      orderId: newOrder._id
    });

  } catch (err) {
    console.error("DB SAVE ERROR:", err); 
    res.status(500).json({ success: false, message: "Database save failed", error: err.message });
  }
};

const paymentLedger = async (req, res) => {
   try {

        const orders = await OrderModel.find()
            .populate("customerId", "name emailid")
            .select("paymentInfo paymentStatus totalAmount orderStatus createdAt")
            .sort({ createdAt: -1 });

        const ledger = orders.map(order => ({
            _id: order._id,
            transactionId: order.paymentInfo?.id || "N/A",
            gatewayOrderId: order.paymentInfo?.orderId || "N/A",
            customer: order.customerId,
            amount: order.totalAmount,
            status: order.paymentStatus, 

            fulfillment: order.orderStatus,
            date: order.createdAt
        }));

        res.status(200).json({ 
            success: true, 
            count: ledger.length,
            payments: ledger 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { createOrder, verifyPayment,paymentLedger };