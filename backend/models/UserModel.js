const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type:String },
    emailid: { type:String },
    password: { type:String },
    role: {
        type:String,
        enum: ["admin", "vendor", "customer"],
        default: "customer"
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, { timestamps: true })
module.exports = mongoose.model("user", userSchema);