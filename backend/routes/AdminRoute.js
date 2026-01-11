const express =require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const {vendorStores, vendorStoreStatus, getAdminDashboardData} = require("../controllers/AdminController");
const { addCategory } = require("../controllers/CategoryController");
const { getAllOrders, updateOrderStatus, getOrderDetailsAdmin } = require("../controllers/OrderConrtoller");
const { getAllStores, updateStatus, deleteStore } = require("../controllers/VendorController");
const { paymentLedger } = require("../controllers/PaymentController");

const router=express.Router();

router.get("/vendorstores",verifyToken,vendorStores);
router.put("/updatestorestatus",verifyToken,vendorStoreStatus);
router.post("/newcategory",verifyToken,addCategory);
router.get("/orders",verifyToken,getAllOrders);
router.put("/order/:id",verifyToken,updateOrderStatus);
router.get("/order/orderdetail/:id",verifyToken,getOrderDetailsAdmin);
router.get("/stores",verifyToken,getAllStores);
router.put("/store/:id",verifyToken,updateStatus);
router.delete("/store/:id",verifyToken,deleteStore);
router.get("/paymentledger",verifyToken,paymentLedger);
router.get("/stats",verifyToken,getAdminDashboardData);

module.exports=router;