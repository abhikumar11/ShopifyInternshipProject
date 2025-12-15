const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
     {
          userId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
          },
          subject:String,
          message:String,
          status:{
            enum:["open","inprogress","closed"],
            default:"open",
          }
     },
     { timestamps: true }
);
module.exports=mongoose.model("Ticket",ticketSchema);