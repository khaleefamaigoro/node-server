const express = require('express');
const transactionController = require('../controller/transaction.controller');

module.exports = () => {
  const app = express.Router();

  app.post('/create', async (req, res) => {
    try {
      const transaction = await transactionController.create(req.body);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  app.get('/', async (req, res) => {
    try {
      const transaction = await transactionController.read();
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.get('/:id', async (req, res) => {
    try {
      const transaction = await transactionController.readOne(req.params);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.put('/:id', async (req, res) => {
    try {
      const transaction = await transactionController.update(req.params.id, req.body);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.delete('/:id', async (req, res) => {
    try {
      const transaction = await transactionController.remove(req.params);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  return app;
}