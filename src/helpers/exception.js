const HttpException = require("../exceptions/httpException");

module.exports = {
  createException(statusCode, message, occurrences) {
    return new HttpException(statusCode, message, occurrences);
  },
  internalServer(message = "internal server error") {
    return new HttpException(500, message);
  },
  unauthorized(message) {
    return new HttpException(401, message);
  },
  forbidden(message = "user is not allowed to access this resource") {
    return new HttpException(403, message);
  },
  notFound(occurrences) {
    return new HttpException(404, "document was not found", occurrences);
  },
  badRequest(message = "bad request", occurrences) {
    return new HttpException(400, message, occurrences);
  },
};
