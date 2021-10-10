if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Client } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;
const client = new Client(DATABASE_URL);

module.exports = client;
