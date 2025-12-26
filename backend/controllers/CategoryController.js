const CategoryModel = require("../models/CategoryModel");

const addCategory=async(req,res)=>{
    try{
    const {name,description,isActive}=req.body;
    console.log({name,description,isActive})
    let cat=await CategoryModel.findOne({name});
    console.log(cat)
        if(cat){
            res.status(400).json({msg:"Category already exist"});
        }
        else{
            cat=await CategoryModel.create({name,description,isActive});
            res.status(201).json({msg:"Category created"});
        }
    }catch(err){
            res.status(500).json({msg:"Something went wrong",err});
    }
}
const getAllCategory=async(req,res)=>{
        try {
        const categories=await CategoryModel.find();
        if(categories){
            res.status(200).json({categories});
        }
        else{
            res.status(200).json({msg:"No category present"});
        }
        } catch (err) {
            res.status(500).json({msg:"Something went wrong"});
        }
}
const editCategory=async(req,res)=>{
    try{
        const {catid,name,description,isActive}=req.body;
        const cat=await CategoryModel.findByIdAndUpdate({_id:catid},{
            name:name,
            description:description,
            isActive:isActive
        });
        if(cat){
            res.status(200).json({msg:"Category Updated"});
        }
        else{
             res.status(401).json({msg:"Unable to update the category"});
        }
    }catch(err){
             res.status(500).json({msg:"Something went wrong"});
    }
}
module.exports={addCategory,getAllCategory,editCategory};