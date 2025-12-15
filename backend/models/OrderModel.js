const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
     {
          customerId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true,
          },
          storeId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Store",
               required: true,
          },
          items: [
               {
                    productId: {
                         type: mongoose.Schema.Types.ObjectId,
                         ref: "Product",
                    },
                    quantity: Number,
                    price: Number,
               },
          ],
          totalAmount: Number,
          paymentStatus: {
               type: String,
               enum: ["pending", "paid", "failed"],
               default: "pending",
          },
          orderStatus: {
               type: String,
               enum: ["placed", "packed", "shipped", "delivered", "cancelled"],
               default: "placed",
          },
     },
     { timestamps: true }
);
module.exports=mongoose.model("Order",orderSchema);