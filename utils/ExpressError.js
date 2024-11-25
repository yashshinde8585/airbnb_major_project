class ExpressError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.status = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
