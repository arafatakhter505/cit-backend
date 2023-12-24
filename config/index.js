require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.PORT,
  },
  db: {
    mongoDbUrl: process.env.MONGO_DB_URL,
  },
};

module.exports = dev;
