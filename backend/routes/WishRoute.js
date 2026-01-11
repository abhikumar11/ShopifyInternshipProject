const express=require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const { toggleWishlist, createTicket } = require("../controllers/InteractionController");

const router=express.Router();

router.post("/wishlist/toggle", verifyToken, toggleWishlist);
router.post("/ticket/new", verifyToken,createTicket);

module.exports=router;
