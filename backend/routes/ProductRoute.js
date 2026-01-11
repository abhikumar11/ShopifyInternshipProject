const express=require("express");
const { addProduct, getVendorProducts, getAllProduct, getProductById } = require("../controllers/ProductController");

const router=express.Router();

router.post("/newproduct",addProduct);
router.get("/vendor/:storeId",getVendorProducts)
router.get("/allproduct",getAllProduct)
router.get("/productdetails/:id",getProductById)

module.exports=router;