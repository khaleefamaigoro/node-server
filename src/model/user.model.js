const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    balance: { type: Number, default: 0 },
    userType: { type: String, enum: ["admin", "customer", "regular"], default: "regular" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
