const ticketSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     subject: String,
     message: String,
     status: { type: String, enum: ["open", "inprogress", "closed"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);