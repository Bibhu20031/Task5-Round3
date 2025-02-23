const Coupon = require("../models/coupon.js");
const Redemption = require("../models/redemption.js");

exports.applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(400).json({ message: "Invalid coupon" });

    if (coupon.expiryDate < new Date())
      return res.status(400).json({ message: "Coupon expired" });

    const alreadyUsed = await Redemption.findOne({ userId, couponId: coupon._id });
    if (alreadyUsed) return res.status(400).json({ message: "Coupon already used" });

    if (orderAmount < coupon.minOrderValue)
      return res.status(400).json({ message: "Minimum purchase not met" });

    if (coupon.isFirstTimeOnly) {
      const userRedemptions = await Redemption.findOne({ userId });
      if (userRedemptions) return res.status(400).json({ message: "Coupon is for first-time users only" });
    }

    let discount = coupon.discountType === "fixed"
      ? coupon.discountValue
      : (orderAmount * coupon.discountValue) / 100;

    await new Redemption({ userId, couponId: coupon._id }).save();

    res.json({ discount });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//For Admins
exports.createCoupon = async (req, res) => {
    try {
      const { code, discountType, discountValue, minOrderValue, expiryDate, isFirstTimeOnly } = req.body;
  
      const existingCoupon = await Coupon.findOne({ code });
      if (existingCoupon) return res.status(400).json({ message: "Coupon already exists" });
  
      const newCoupon = new Coupon({
        code,
        discountType,
        discountValue,
        minOrderValue,
        expiryDate,
        isFirstTimeOnly,
        createdBy: req.user._id,
      });
  
      await newCoupon.save();
      res.status(201).json({ message: "Coupon created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};


//For users
exports.getUserCoupons = async (req, res) => {
    try {
      const userId = req.user._id;
      const usedCoupons = await Redemption.find({ userId }).distinct("couponId");
  
      const availableCoupons = await Coupon.find({
        _id: { $nin: usedCoupons },
        expiryDate: { $gte: new Date() },
      });
  
      res.json(availableCoupons);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
  