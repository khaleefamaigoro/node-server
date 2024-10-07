const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecrete } = require('../config');

class UserController {
  constructor() {
    userModel.ensureIndexes()
  }

  async register(body) {
    try {
      const existing = userModel.findOne({ email: body.email });
      if (existing) throw new Error("User with this email already exist");
      body.password = await bcrypt.hash(body.password, 10);
      const newUser = new userModel(body);
      let user = await newUser.save();
      return user;
    } catch (error) {
      return error.message;
    }
  }

  async login({ email, password }) {
    try {

      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("Invalid Credentials")
      }
      const isPassword = bcrypt.compare(password, user.password);
      if (!isPassword) {
        throw new Error("Invalid Credentials")
      }
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        userType: user.userType
      }, jwtSecrete)
      return { token, user };
    } catch (error) {
      return error.message;
    }
  }

  async read() {
    try {
      let users = await userModel.find();
      return users;
    } catch (error) {
      return error.message;
    }
  }

  async readOne({ id }) {
    try {
      let user = await userModel.findById(id);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  async update({ id }, body) {
    try {
      const newData = body;
      let user = await userModel.findOneAndUpdate({ "_id": id }, newData, { new: true });
      return user;
    } catch (error) {
      return error.message;
    }
  }

  async remove({ id }) {
    try {
      let user = await userModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new UserController();