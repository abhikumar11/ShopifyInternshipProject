const StoreModel = require("../models/StoreModel")

const createStore=async(req,res)=>{
    const {storeName,description,logo}=req.body;
    console.log(req.body)
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
const getStore = async (req, res) => {
    try {
     
        const store = await StoreModel.findOne({ ownerId: req.user.userid });

        if (!store) {
            return res.status(200).json({success: true,message: "No store found for this user",store: null});
        }
        res.status(200).json({ success: true, store: store});

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal Server Error"});
    }
}
module.exports={createStore,getStore}