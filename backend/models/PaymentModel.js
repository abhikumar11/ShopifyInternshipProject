const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
     {
          orderId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Order",
               required: true,
          },
         
          paymentMethod: String,
          transactionId:String,
          amount:Number,
          status: {
               type: String,
               enum: ["success", "failed", "pending"],
          },
     },
     { timestamps: true }
);
module.exports=mongoose.model("Payment",paymentSchema);