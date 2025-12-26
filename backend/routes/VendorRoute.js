const express=require("express");
const { createStore, getStore } = require("../controllers/VendorController");
const verifyToken = require("../middleware/AuthMiddleware");

const router=express.Router();

router.post("/newstore",verifyToken,createStore);
router.get("/getstore",verifyToken,getStore);

module.exports=router;
