const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  gaushalaId: { type: mongoose.Schema.Types.ObjectId, ref: "Gaushala" },
  customerName: String,
  quantity: Number, // in Litres
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "approved", "delivered"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
