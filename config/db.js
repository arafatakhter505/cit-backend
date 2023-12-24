const mongoose = require("mongoose");
const dev = require(".");

const connectDb = async () => {
  try {
    await mongoose
      .connect(dev.db.mongoDbUrl)
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
