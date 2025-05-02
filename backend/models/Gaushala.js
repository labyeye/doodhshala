const mongoose = require("mongoose");

const gaushalaSchema = new mongoose.Schema(
  {
    gaushalaName: String,
    ownerName: String,
    phone: String,
    email: { type: String, unique: true },
    address: String,
    milkCapacity: Number,
    breedType: String,
    deliveryRadius: Number,
    aadharNumber: String,
    locationUrl: String,
    password: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    milkToday: {
      morning: { type: Number, default: 0 },
      evening: { type: Number, default: 0 },
    },
    milkAvailabilityHistory: [
      {
        date: String, // format: YYYY-MM-DD
        morning: Number,
        evening: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gaushala", gaushalaSchema);
