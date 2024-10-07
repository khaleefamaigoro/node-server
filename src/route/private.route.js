const userController = require("../controller/user.controller");
const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");


module.exports = () => {
  const app = express.Router();

  //Get All
  app.get('/', authMiddleware(["regular"]), async (req, res) => {
    try {
      const users = await userController.read();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  //Single User
  app.get('/:id',authMiddleware, async (req, res) => {
    try {
      const user = await userController.readOne(req.params);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.put('/:id', async (req, res) => {
    try {
      const user = await userController.update(req.params, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  app.delete('/:id', async (req, res) => {
    try {
      const user = await userController.remove(req.params);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  return app;
}
