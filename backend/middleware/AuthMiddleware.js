const jwt=require("jsonwebtoken");
require("dotenv").config();

const verifyToken=async(req,res,next)=>{
    try {
        const authHeader=req.headers["authorization"];
        const token =authHeader.startsWith("Bearer ")?authHeader.split(' ')[1]:authHeader;
        if(!token){
            return res.status(401).json({msg:"No token provided"});
        }
       const decode=jwt.verify(token,process.env.SECRETKEY);
       req.user = decode.user;
       next();
    } catch (err) {
        return res.status(403).json({msg:"Invalid or expired token"});
    }
}
module.exports=verifyToken;