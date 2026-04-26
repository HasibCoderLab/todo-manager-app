import {AppError} from '../utils/appError.js';

export const notFound = (req, _res, next) => {
  const message = req.originalUrl.startsWith('/api/')
  ? `Api route not found: ${req.method} and ${req.originalUrl}`
  : `resource not found: ${req.originalUrl}`
  next(AppError.notFound(message))
}