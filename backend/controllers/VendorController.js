const StoreModel = require("../models/StoreModel");
const UserModel = require("../models/UserModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "store_assets",
        format: async (req, file) => "jpg",
        public_id: (req, file) => `store-${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage: storage }).fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]);

const createStore = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ msg: "Upload failed", error: err.message });
        }

        try {
            const { storeName, description } = req.body;

            const existingStore = await StoreModel.findOne({ ownerId: req.user.userid });
            if (existingStore) {
                return res.status(400).json({ msg: "You already have an active store." });
            }

            if (!req.files || !req.files['logo'] || !req.files['banner']) {
                return res.status(400).json({ msg: "Please upload both logo and banner images." });
            }

            const logoUrl = req.files['logo'][0].path;
            const bannerUrl = req.files['banner'][0].path;

            const newStore = await StoreModel.create({
                storeName,
                description,
                logo: logoUrl,
                banner: bannerUrl,
                ownerId: req.user.userid,
                status: "pending" 

            });

            res.status(201).json({
                success: true,
                msg: "Store created successfully. Awaiting admin approval.",
                store: newStore,
                status: newStore.status
            });

        } catch (dbErr) {
            console.error(dbErr);
            res.status(500).json({ msg: "Server error during store creation", error: dbErr.message });
        }
    });
};

const getStore = async (req, res) => {
    try {
        const store = await StoreModel.findOne({ ownerId: req.user.userid });
        if (!store) {
            return res.status(200).json({ success: false, store: null });
        }
        res.status(200).json({ success: true, store });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const getAllStores = async (req, res) => {
    try {

        const stores = await StoreModel.find()
            .populate("ownerId", "name emailid role isActive")
            .sort({ createdAt: -1 }); 

        if (!stores || stores.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No stores found in the database"
            });
        }

        res.status(200).json({
            success: true,
            count: stores.length,
            stores
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({
            success: false,
            msg: "Server error while fetching stores",
            error: error.message
        });
    }
};
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const store = await StoreModel.findById(id);

        if (!store) {
            return res.status(404).json({ success: false, msg: "Store not found" });
        }

        store.status = status;
        await store.save();

        if (status === "approved") {
            await UserModel.findByIdAndUpdate(store.ownerId, { role: "vendor" });
        }

        if (status === "disabled") {
            await UserModel.findByIdAndUpdate(store.ownerId, { isActive: false });
        }

        res.status(200).json({
            success: true,
            msg: `Store status updated to ${status}`,
            store
        });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;

        const store = await StoreModel.findById(id);
        if (!store) {
            return res.status(404).json({ success: false, msg: "Store not found" });
        }

        await UserModel.findByIdAndUpdate(store.ownerId, { role: "buyer" });

        await StoreModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Store deleted and user role reverted to buyer"
        });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

module.exports = { createStore, getStore,getAllStores,updateStatus,deleteStore };