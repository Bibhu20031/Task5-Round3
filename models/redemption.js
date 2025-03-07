const mongoose = require("mongoose");

const redemptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", required: true },
  usedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Redemption", redemptionSchema);
