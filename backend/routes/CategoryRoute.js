const express =require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const { addCategory, getAllCategory, editCategory, deleteCategory } = require("../controllers/CategoryController");
const router=express.Router();

router.post("/newcategory",verifyToken,addCategory);
router.get("/categorylist",getAllCategory);
router.put("/catedit/:id",verifyToken,editCategory);
router.delete("/delcat/:id",verifyToken,deleteCategory);

module.exports=router;