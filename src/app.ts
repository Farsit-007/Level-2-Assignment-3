import express, { Application } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import { notFound } from './app/middleware/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))

app.use('/api', router)

app.use(globalErrorHandler)
app.use(notFound)
export default app
