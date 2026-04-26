
export const successResponse = (res, data, message = 'success', statusCode = 200) => {
  res.status(statusCode).json({
    suceess: true,
    data,
    message
  })
}


export const errorResponse = (res, message = 'server error', statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message
  })
}