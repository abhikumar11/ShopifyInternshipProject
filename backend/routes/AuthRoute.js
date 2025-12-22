const express=require("express");
const { logiUser, registerUser } = require("../controllers/UserController");

const router=express.Router();

router.post("/login",logiUser);
router.post("/register",registerUser);

module.exports=router;