const productSchema = new mongoose.Schema({
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [String],
    variants: [{ size: String, color: String, sku: String, stock: Number }],
    status: { type: String, enum: ["active", "inactive", "blocked"], default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);