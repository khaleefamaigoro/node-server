const mongoose = require('mongoose');


const TransactionSheme = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true},
    status: { type: String, enum: ["completed", "pending", "failed"], default: "pending" },
    transactionType: { type: String, enum: ["credit", "debit"], required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSheme);