const transactionModel = require("../model/transaction.model");

class TransactionController {
  //CRUD
  async create(body) {
    try {
      console.log({body});
      const newTransaction = new transactionModel(body);
      let transaction = await newTransaction.save();
      return transaction;
    } catch (error) {
      return error.message;
    }
  }

  async read() {
    try {
      let transactions = await transactionModel.find();
      return transactions;
    } catch (error) {
      return error.message;
    }
  }

  async readOne({ id }) {
    try {
      let transactions = await transactionModel.findById(id);
      return transactions;
    } catch (error) {
      return error.message;
    }
  }

  async update( id , body) {
    try {
      const newTransaction = body;
      console.log(id, body);
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