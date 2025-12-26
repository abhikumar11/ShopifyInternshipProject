const express=require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const { createOrder,getOrder } = require("../controllers/OrderConrtoller");
const router=express.Router();

router.post("/neworder",verifyToken,createOrder)
router.post("/getorders",verifyToken,getOrder)
module.exports=router;