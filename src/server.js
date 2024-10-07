require('./connection/mongo.connection')(); //DB Connection
const express = require('express');
const cors = require('cors');
const privateRouter = require("./route/private.route");
const publicRouter = require("./route/public.route");
const transactionRoute = require('./route/transaction.route');

const app = express();

//PORT NUMBER
const PORT = process.env.PORT || 3000;

// MiddleWares
app.use(express.json());
app.use(cors());
app.use("/public", publicRouter());
app.use("/private", privateRouter());
app.use("/transaction", transactionRoute());


// Listening Port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});