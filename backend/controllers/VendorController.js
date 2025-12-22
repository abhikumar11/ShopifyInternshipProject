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
                res.status(201).json({msg:"Store Created",status:temp.status});
              }
              else{
                res.status(400).json({msg:"Unable to create store"})
              }
        }catch(err){
                res.status(500).send({msg:"Something went wrong"});
        }
}
module.exports={createStore}