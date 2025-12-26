const StoreModel = require("../models/StoreModel");

const vendorStores = async (req, res) => {
        try {
                const store = await StoreModel.find({});
                res.status(201).json({store: store});

        } catch (err) {
                res.status(500).send({ msg: "Something went wrong",err });
        }
}
const vendorStoreStatus=async(req,res)=>{
        const {ownerId,status}=req.body; 
        try {
           const temp=await StoreModel.findOneAndUpdate({ownerId:ownerId},{status:status})
           if(temp){
                res.status(201).json({msg:"Store status updated"});
           }
           else{
                 res.status(400).json({msg:"Unable to update status"});
           }
        } catch (err) {
                 res.status(500).json({msg:"Something went wrong"});
        }               

}
module.exports = { vendorStores,vendorStoreStatus };