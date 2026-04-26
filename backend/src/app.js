import express from 'express'
import {appRoutes} from './routes/appRoutes.js';
import {todoRoute} from './routes/todoRoute.js';
import {errorHandler} from './middlewares/globalErrorHandler.js';
import {notFound} from './middlewares/notFound.js';
import cors from 'cors'
import {dbConnect} from './middlewares/dbConnect.js';
import {requestLogger} from './middlewares/requestLogger.js';

export const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(requestLogger)
app.use(dbConnect)

app.use('/', appRoutes)
app.use('/api/todos', todoRoute)

app.use(notFound)
app.use(errorHandler)