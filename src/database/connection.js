const mongoose = require("mongoose");

const { DATABASE_CONNECTION_STRING } = process.env;

module.exports = mongoose.createConnection(DATABASE_CONNECTION_STRING);
