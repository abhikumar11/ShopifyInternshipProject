const express=require("express");

const router=express.Router();

router.use("/auth",require("./AuthRoute"));
router.use("/admin",require("./AdminRoute"));
router.use("/vendor",require("./VendorRoute"));

module.exports=router;