const transactionModel = require("../model/transaction.model");
const userModel = require("../model/user.model");

class TransactionController {

  async createAtomic(body) {
    try {
      const { senderId, receiverId, amount } = body;
  
      // Perform both balance updates and transaction inserts in a single bulkWrite operation
      const operations = await userModel.bulkWrite([
        // Update sender's balance
        {
          updateOne: {
            filter: { _id: senderId, balance: { $gte: amount } }, // Ensure sender has enough balance
            update: { $inc: { balance: -amount } }, // Decrease sender's balance
          },
        },
        // Update receiver's balance
        {
          updateOne: {
            filter: { _id: receiverId },
            update: { $inc: { balance: amount } }, // Increase receiver's balance
          },
        },
        // Insert debit transaction for sender
        {
          insertOne: {
            document: {
              user: senderId,
              transactionType: "debit",
              amount,
              status: "completed",
            },
          },
        },
        // Insert credit transaction for receiver
        {
          insertOne: {
            document: {
              user: receiverId,
              transactionType: "credit",
              amount,
              status: "completed",
            },
          },
        },
      ]);
  
      // Check if the sender's balance update was successful (i.e., matched a record)
      if (operations.result.nMatched === 0) {
        throw new Error("Insufficient balance or sender not found");
      }
  
      return operations;
  
    } catch (error) {
      return error.message;
    }
  }

  async create(body) {
    try {
      // start transaction
      const { senderId, receiverId, amount } = body
      const sender = await userModel.findById(senderId);
      if (!sender) {
        throw new Error("sender record not found")
      }
      if (sender.balance < amount) {
        throw new Error("insufficient balance")
      }
      const receiver = await userModel.findById(receiverId);
      if (!receiver) {
        throw new Error("reciever record not found")
      }
      sender.balance = sender.balance - amount
      await sender.save()/////
      receiver.balance = receiver.balance + amount
      await receiver.save()
      // const newTransaction = new transactionModel({});
      // let transaction = await newTransaction.save();
      const transactions = transactionModel.insertMany([{
        user: senderId,
        transactionType: "debit",
        amount
      },
      {
        user: receiverId,
        transactionType: "credit",
        amount
      }
      ])
      // commit
      return transactions;
    } catch (error) {
      return error.message;
    }
  }

  async read(userId) {
    try {
      let transactions = await transactionModel.find({ user: userId });
      return transactions;
    } catch (error) {
      return error.message;
    }
  }

  async readOne({ id }) {
    try {
      let transactions = await transactionModel.findById(id).populate("user");
      return transactions;
    } catch (error) {
      return error.message;
    }
  }

  async update(id, body) {
    try {
      const newTransaction = body;
      let transaction = await transactionModel.findOneAndUpdate({ "_id": id }, newTransaction, { new: true });
      return transaction;
    } catch (error) {
      return error.message;
    }
  }

  async remove({ id }) {
    try {
      let transaction = await transactionModel.findByIdAndDelete(id);
      return transaction;
    } catch (error) {
      return error.message;
    }
  }

}

module.exports = new TransactionController();