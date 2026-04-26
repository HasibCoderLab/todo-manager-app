import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return
 try {
   const connectionDB = await mongoose.connect(process.env.MONGODB_URI)
   console.log(`mongodb connected ${connectionDB.connection.host}`)
 } catch (error) {
   console.error(`mongodb failed ${error.message}`)
   throw error
 }
}