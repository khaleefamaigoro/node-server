const { default: mongoose } = require('mongoose');


async function mangoDBConnect() {
  const dbConn = mongoose.connection;

  const uri = "mongodb://ddlduser:ddldpass@mongo.ndeportal.ng:27017/tutordb?authSource=admin";

  dbConn.on("connecting", () => {
    console.log('Connecting to DB');
  });

  dbConn.on("connected", () => {
    console.log('Connected to DB');
  });

  dbConn.on("disconnected", () => {
    console.log('Disconnected to DB');
    mongoose.connect(uri);
  })

  dbConn.on("error", (error) => {
    console.log('Error Connecting to DB', error.message);
  })

  mongoose.connect(uri);
}

module.exports = mangoDBConnect;