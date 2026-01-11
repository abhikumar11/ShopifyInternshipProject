const ProductModel = require("../models/ProductModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req, file) => `prod-${Date.now()}-${file.originalname.split('.')[0]}`,
    },
});

const upload = multer({ storage: storage }).array("images", 5);

const addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ msg: "Image upload failed", error: err.message });
        }

        try {
            const { title, description, price, categoryId, status, variants, storeId,stock } = req.body;
            const imagePaths = req.files.map(file => file.path);
            const parsedVariants = variants ? JSON.parse(variants) : [];

            const product = await ProductModel.create({
                title,
                description,
                price: Number(price),
                categoryId,
                status,
                stock,
                storeId,
                variants: parsedVariants,
                images: imagePaths
            });

            res.status(201).json({ 
                success: true, 
                msg: "Product created successfully", 
                product 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Database error", error: error.message });
        }
    });
};

const editProduct = async (req, res) => {
  try {

        const product = await ProductModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, msg: "Product modified", product });
    } catch (err) { 
        res.status(500).json({ success: false, msg: "Edit failed" }); 
    }
};

const deleteProduct = async (req, res) => {
    try {

        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, msg: "Product removed" });
    } catch (err) { 
        res.status(500).json({ success: false, msg: "Delete failed" }); 
    }
};
const getVendorProducts = async (req, res) => {
    try {
        
        const products = await ProductModel.find({ storeId: req.params.storeId })
            .populate("categoryId", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            msg: "Failed to fetch inventory", 
            error: err.message 
        });
    }
};
const getAllProduct=async(req,res)=>{

    try{
  
     const products = await ProductModel.find({});

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            msg: "Failed to fetch products", 
            error: err.message 
        });
    }

}
const getProductById=async(req,res)=>{
    try {
        console.log(req.params.id)
    const product = await ProductModel.findById(req.params.id)
      .populate("categoryId", "name") 
      .populate("storeId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports={addProduct,editProduct,deleteProduct,getVendorProducts,getAllProduct,getProductById}