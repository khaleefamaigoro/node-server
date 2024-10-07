const userController = require("../controller/user.controller");
const express = require("express");

module.exports = () => {
  const app = express.Router();

  app.post('/register', async (req, res) => {
    try {
      const user = await userController.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const data = await userController.login(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return app;
}

