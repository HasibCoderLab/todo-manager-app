import {connectDB} from '../config/db.js';

export const dbConnect = async (_req, _res, next) => {
  try {
    await connectDB()
  } catch (error) {
    return next(error)
  }
  next()
}