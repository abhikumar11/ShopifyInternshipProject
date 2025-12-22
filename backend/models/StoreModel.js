const storeSchema = new mongoose.Schema({
     ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     storeName: { type: String, required: true },
     description: String,
     logo: String,
     banner: String,
     status: {
          type: String,
          enum: ["pending", "approved", "rejected", "disabled"],
          default: "pending"
     }
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);