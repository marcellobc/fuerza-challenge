const HttpException = require("../exceptions/httpException");
const exceptionHelper = require("../helpers/exception");
const mongoose = require("mongoose");

module.exports = (error, req, res, next) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).send(error);
  } else if (error instanceof mongoose.Error) {
    const errors = Object.values(error.errors).map((e) => e);
    return res
      .status(400)
      .send(exceptionHelper.badRequest(error._message, errors));
  }

  return res.status(500).send(exceptionHelper.internalServer());
};
