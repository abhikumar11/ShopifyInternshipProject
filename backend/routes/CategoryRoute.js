const express =require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const { addCategory, getAllCategory, editCategory } = require("../controllers/CategoryController");
const router=express.Router();

router.post("/newcategory",verifyToken,addCategory);
router.get("/categorylist",getAllCategory);
router.put("/catedit",verifyToken,editCategory);

module.exports=router;