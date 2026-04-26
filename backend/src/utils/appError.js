export class AppError extends Error{
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode
    this.isOperational = true
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
  static badRequest(message = 'Bad request') {
    return new AppError(message, 400)
  }
  static notFound(message = 'resource not found') {
    return new AppError(message, 404)
  }
  static conflict(message = 'resource already exists') {
    return new AppError(message, 409)
  }
  static internal(message = 'internal server error') {
    return new AppError(message, 500)
  }
}