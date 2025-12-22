const express=require("express");
const { createStore } = require("../controllers/VendorController");
const verifyToken = require("../middleware/AuthMiddleware");

const router=express.Router();

router.post("/newstore",verifyToken,createStore);

module.exports=router;
