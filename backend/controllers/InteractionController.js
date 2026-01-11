const WishlistModel = require("../models/WishlistModel");
const TicketModel = require("../models/TicketModel");

exports.toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        let list = await WishlistModel.findOne({ customerId: req.user.userid });
        if (list.products.includes(productId)) {
            list.products = list.products.filter(id => id.toString() !== productId);
        } else {
            list.products.push(productId);
        }
        await list.save();
        res.status(200).json({ msg: "Wishlist updated", list });
    } catch (err) { res.status(500).json({ msg: "Error" }); }
};

exports.createTicket = async (req, res) => {
    try {
        const ticket = await TicketModel.create({ ...req.body, userId: req.user.userid });
        res.status(201).json({ msg: "Ticket raised", ticket });
    } catch (err) { res.status(500).json({ msg: "Error" }); }
};