const express=require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const { createOrder,getOrder, getSingleOrder } = require("../controllers/OrderConrtoller");
const router=express.Router();

router.post("/neworder",verifyToken,createOrder)
router.get("/getorder",verifyToken,getOrder)
router.get("/orderdetail/:id",verifyToken,getSingleOrder)
module.exports=router;