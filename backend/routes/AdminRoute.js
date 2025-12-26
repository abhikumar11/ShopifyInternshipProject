const express =require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const {vendorStores, vendorStoreStatus} = require("../controllers/AdminController");
const { addCategory } = require("../controllers/CategoryController");
const router=express.Router();

router.get("/vendorstores",verifyToken,vendorStores);
router.put("/updatestorestatus",verifyToken,vendorStoreStatus);
router.post("/newcategory",verifyToken,addCategory);

module.exports=router;