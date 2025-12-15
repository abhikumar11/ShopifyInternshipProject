const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
     {
          ownerId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true,
          },
          storeName: {
               type: String,
               required: true,
          },
          description: { type: String },
          logo: { type: String },
          banner: { type: String },
          status: {
               type: String,
               enum: ["pending", "approved", "rejected", "disabled"],
               default: "pending",
          },
     },
     { timestamps: true }
);

module.exports = mongoose.model("store", storeSchema);
