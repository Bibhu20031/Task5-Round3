const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discountType: { type: String, enum: ["fixed", "percentage"], required: true },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  expiryDate: { type: Date, required: true },
  isFirstTimeOnly: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin ID
});

module.exports = mongoose.model("Coupon", couponSchema);
