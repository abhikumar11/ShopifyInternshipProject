const OrderModel = require("../models/OrderModel");

const createOrder=async(req,res)=>{
    try{
            res.send("order created");
    }catch(err){

    }
}

const getOrder=async(req,res)=>{
    try{
            const order=await OrderModel.find({customerId:req.user.userid});
            if(order){
                res.status(200).json({order:order});
            }
            else{
                 res.status(200).json({msg:"No order avilable"});
            }
    }catch(err){
        res.status(500).json({msg:"Something went wrong"});
    }
}
module.exports={createOrder,getOrder}