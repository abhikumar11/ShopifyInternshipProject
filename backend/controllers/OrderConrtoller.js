const OrderModel = require("../models/OrderModel");

const createOrder = async (req, res) => {
     try {
          res.send("order created");
     } catch (err) {}
};

const getOrder = async (req, res) => {
    try {
        // 1. Fetch orders with 'lean' for better performance
        // and populate the productId reference
        const orders = await OrderModel.find({ customerId: req.user.userid })
            .populate({
                path: "items.productId",
                select: "title images price" 
            })
            .sort({ createdAt: -1 })
            .lean(); 

        // 2. Format the data for the frontend
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            date: order.createdAt,
            totalAmount: order.totalAmount,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            // 3. Flatten the items array so the frontend doesn't have to drill down
            items: (order.items || []).map(item => {
                const product = item.productId;
                return {
                    productId: product?._id || null,
                    name: product ? product.title : "Product Unavailable",
                    // Grabs the first image if available
                    image: product && product.images?.length > 0 
                           ? product.images[0] 
                           : "https://via.placeholder.com/150?text=No+Image", 
                    quantity: item.quantity,
                    price: item.price
                };
            })
        }));

        // 4. Return the formatted data
        return res.status(200).json({ 
            success: true,
            order: formattedOrders,
            count: formattedOrders.length
        });

    } catch (err) {
        console.error("Order Fetch Error Details:", err);
        return res.status(500).json({ 
            success: false,
            msg: "Internal Server Error while fetching orders" 
        });
    }
};
const updateOrderStatus = async (req, res) => {
     try {
          const { status } = req.body;
          const { id } = req.params; 
          
          const order = await OrderModel.findByIdAndUpdate(
               id,
               { orderStatus: status },
               { new: true, runValidators: true }
          );

          if (!order) {
               return res.status(404).json({ success: false, msg: "Order not found" });
          }

          if (status === "delivered") {
               order.paymentStatus = "paid";
               await order.save();
          }

          res.status(200).json({ 
               success: true, 
               msg: `Order updated to ${status}`, 
               order 
          });

     } catch (err) {
          res.status(500).json({ 
               success: false, 
               msg: "Update failed", 
               error: err.message 
          });
     }
};

const getSingleOrder = async (req, res) => {
    try {
     
        const order = await OrderModel.findOne({ 
            _id: req.params.id, 
            customerId: req.user.userid 
        })
        .populate({
            path: "items.productId",
            select: "title images price"
        })
        .lean();

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                msg: "Order not found or unauthorized" 
            });
        }

        const formattedOrder = {
            ...order,
            date: order.createdAt,
            items: order.items.map(item => ({
                productId: item.productId?._id,
                name: item.productId ? item.productId.title : "Product Unavailable",
                image: item.productId && item.productId.images?.length > 0 
                       ? item.productId.images[0] 
                       : "https://via.placeholder.com/150",
                quantity: item.quantity,
                price: item.price
            }))
        };

        res.status(200).json({ 
            success: true, 
            order: formattedOrder 
        });

    } catch (err) {
        console.error("Single Order Error:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
};
const getAllOrders = async (req, res) => {
    try {
        
        const orders = await OrderModel.find()
            .populate("customerId", "name emailid") 
            .sort({ createdAt: -1 });

        // Calculate platform-wide total revenue
        const totalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.status(200).json({
            success: true,
            totalAmount,
            order: orders 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failed to fetch orders queue",
            error: error.message
        });
    }
};
const getOrderDetailsAdmin = async (req, res) => {
    try {
        // 1. Find order by ID only (Admins can see all orders)
        // 2. Populate customer details AND product details
        const order = await OrderModel.findById(req.params.id)
            .populate("customerId", "name emailid") // Get buyer info
            .populate({
                path: "items.productId",
                select: "title images price" // Get product info
            })
            .lean();

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                msg: "Order not found" 
            });
        }

        // 3. Format data for the Admin UI
        const formattedOrder = {
            ...order,
            customer: order.customerId, // Clearly separate customer object
            items: order.items.map(item => ({
                productId: item.productId?._id,
                name: item.productId ? item.productId.title : "Product Deleted",
                image: item.productId?.images?.[0] || "https://via.placeholder.com/150",
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            }))
        };

        res.status(200).json({ 
            success: true, 
            order: formattedOrder 
        });

    } catch (err) {
        console.error("Admin Single Order Error:", err);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};
const getAllStores=async(req,res)=>{

}

module.exports = { createOrder, getOrder, updateOrderStatus,getSingleOrder,getAllOrders,getOrderDetailsAdmin };
