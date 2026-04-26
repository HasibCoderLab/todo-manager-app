import {errorResponse} from '../utils/apiResponse.js';

const error_map = [
  {
    match: err => err.name === 'CastError',
    status: 400,
    getMessage: err => `invalid ${err.path}: ${err.value}`
  },
  {
    match: err => err.code === 11000,
    status: 409,
    getMessage: err => {
      const field = Object.keys(err.keyValue).join(', ')
      return `duplicated value for ${field}`
    }
  },
  {
    match: err => err.name === 'ValidationError',
    status: 400,
    getMessage: err =>
      Object.values(err.errors)
      .map(er => er.message)
      .join(', ')
  },
  {
    match: err => err.type === 'entity.parse.failed',
    status: 400,
    message: 'Invalid json in request'
  },
  {
    match: err => err.name === 'SyntaxError' && err.status === 400,
    status: 400,
    message: 'invalid syntax in request'
  }
]

const resolveError = err => {
  const known = error_map.find(entry => entry.match(err))
  if (known) {
    return {
      statusCode: known.status,
      message: known.getMessage ? known.getMessage(err) : known.message
    }
  }

  if (err.isOperational) {
    return {
      statusCode: err.statusCode,
      message: err.message
    }
  }

  return {
    statusCode: 500,
    message: 'something went wrong'
  }
}

const isDev = process.env.NODE_ENV === 'development'

export const errorHandler = (err, req, res, _next) => {
  const {statusCode, message} = resolveError(err)
  if (isDev || statusCode >= 500) {
    console.error(`error ${req.method} and ${req.originalUrl} => ${statusCode}`, {
      message: err.message,
      ...(isDev && {stack: err.stack})
    })
  }
  return errorResponse(res, message, statusCode)
}