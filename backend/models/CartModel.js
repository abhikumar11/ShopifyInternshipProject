const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
            quantity:Number,
            price:Number,
        }
    ]
},{timestamps:true});
module.exports=mongoose.model("Cart",cartSchema);