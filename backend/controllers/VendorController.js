const StoreModel = require("../models/StoreModel")

const createStore=async(req,res)=>{
    const {storeName,description,logo}=req.body;
        try{
              const temp=await StoreModel.create({
                        storeName,
                        description,
                        logo,
                        ownerId:req.user.userid
              });
              if(temp){
                res.status(201).send(temp);
              }
        }catch(err){
                res.status(500).send(err);
        }
}
module.exports={createStore}