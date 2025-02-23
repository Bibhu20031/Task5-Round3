Coupon & Discount System API
A simple coupon system for validating, redeeming, and applying discounts in EquipSetu.

API Endpoints
Create a Coupon (Admin Only)
POST /api/coupons/create-coupon
Creates a new coupon.

Request:
{
  "code": "NEWYEAR2025",
  "discountType": "fixed",
  "discountValue": 500,
  "minOrderValue": 5000,
  "expiryDate": "2025-03-01T23:59:59.000Z"
}

Response:
{
  "message": "Coupon created successfully",
  "coupon": { ... }
}
Authentication: Admin (Bearer Token)

Apply Coupon
POST /api/coupons/apply-coupon
Validates and applies a coupon.

Request:

{
  "code": "NEWYEAR2025",
  "userId": "65d1f4a9b8c9a8d542f0bfb48",
  "orderAmount": 6000
}

Response (Valid Coupon):
{
  "message": "Coupon applied successfully",
  "discountAmount": 500,
  "finalAmount": 5500
}

Error Responses:
{ "error": "Coupon expired" }
{ "error": "Coupon already used" }
{ "error": "Minimum purchase not met" }
Get User Coupons
GET /api/coupons/user-coupons/:userId
Retrieves all available coupons for a user.

Response:
{
  "coupons": [
    {
      "code": "NEWYEAR2025",
      "discountType": "fixed",
      "discountValue": 500,
      "expiryDate": "2025-03-01T23:59:59.000Z"
    }
  ]
}


Database Schema (coupons Collection)
{
  "_id": "ObjectId",
  "code": "String",
  "discountType": "String",
  "discountValue": "Number",
  "minOrderValue": "Number",
  "expiryDate": "Date",
  "usedBy": ["UserId"]
}

Authentication
Admin routes require an Authorization: Bearer <token> header.
User routes require a valid userId.

Error Messages
"Coupon expired" – The coupon is past its expiry date.
"Coupon already used" – The user has already redeemed this coupon.
"Invalid coupon" – The provided coupon code doesn’t exist.
"Minimum purchase not met" – Order total is below the required amount.


Setup and Installation
Install dependencies:
npm install

Set up environment variables (.env):
MONGO_URI=mongodb+srv://your-db-url
JWT_SECRET=your_secret_key


Start the server:
npm start


API runs at: http://localhost:5000/api/coupons
