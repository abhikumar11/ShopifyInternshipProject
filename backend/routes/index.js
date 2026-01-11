const express=require("express");

const router=express.Router();

router.use("/auth",require("./AuthRoute"));
router.use("/admin",require("./AdminRoute"));
router.use("/vendor",require("./VendorRoute"));
router.use("/pro",require("./ProductRoute"));
router.use("/cat",require("./CategoryRoute"));
router.use("/order",require("./OrderRoute"));
router.use("/util",require("./WishRoute"));
router.use("/payment",require("./PaymentRoute"));

module.exports=router;