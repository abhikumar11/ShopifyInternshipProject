const express =require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const {getName} = require("../controllers/AdminController");
const router=express.Router();

router.get("/getname",verifyToken,getName);

module.exports=router;