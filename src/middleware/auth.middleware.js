const { jwtSecrete } = require('../config');
const jwt = require("jsonwebtoken");

const authMiddleware = (userTypes)=> (req, res, next) =>{
  const token = req.headers["x-token"];
  try {
    if (!token) {
      return res.status(401).send("no token found")
    }
    const payload = jwt.verify(token, jwtSecrete)
    req.user = payload


    if (!payload) {
      return res.status(401).send("invalid token found")
    }
    if (!userTypes.includes(payload.userType)) {
      return res.status(401).send("Not Authorise")
    }
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  authMiddleware
}