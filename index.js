const dotenv= require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use("/api/coupons", require("./routes/coupon.routes.js"));

const PORT= 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
