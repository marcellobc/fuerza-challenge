require("express-async-errors");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/api");

const generalErrorHandler = require("./middlewares/generalErrorHandler");

class App {
  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(routes);
    this.express.use(generalErrorHandler);
  }
}

module.exports = new App().express;
