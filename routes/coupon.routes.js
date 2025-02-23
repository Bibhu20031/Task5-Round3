const express = require("express");
const { applyCoupon, createCoupon, getUserCoupons } = require("../controllers/coupon.controllers.js");
const { authenticateUser, isAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/apply-coupon", authenticateUser, applyCoupon);
router.post("/create-coupon", authenticateUser, isAdmin, createCoupon);
router.get("/user-coupons", authenticateUser, getUserCoupons);

module.exports = router;
