const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const logiUser = async(req, res) => {

    try{
        const {emailid,password}=req.body;
        console.log({emailid,password})
        const user=await UserModel.findOne({emailid});
        if(user){
            const hashPass=await bcrypt.compare(password,user.password);
            if(hashPass){
                const userdata={userid:user._id,name:user.name,role:user.role}
                const token= jwt.sign({user:userdata},process.env.SECRETKEY,{expiresIn:"1h"});
                 res.status(201).send({user:userdata,token:token,msg: "User login successfull" });
            }
            else{
                 res.status(401).send({ user:null, msg: "Incorrect Password"});
            }
        }
        else{
               res.status(401).send({ user: null, msg: "Incorrect Email Id"});
        }
    }catch(err){
        res.status(500).json({ user: null, msg: "Something went wrong", error: err });
    }
     

}
const registerUser = async (req, res) => {
  try {
    const { name, emailid, password, role } = req.body;
    const active = role === "vendor" ? false : true;

    let user = await UserModel.findOne({ emailid });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Email id already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    user = await UserModel.create({
      name,
      emailid,
      password: hashPass,
      role,
      isActive: active,
    });

    return res.status(201).json({
      success: true,
      msg: "Account created successfully",
      user,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

module.exports = { logiUser, registerUser };