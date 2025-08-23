import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app = express()

//parser
app.use(express.json())
app.use(cors())

//application routes

app.use('/api', router)

const test = async (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', test)

app.use(globalErrorHandler)

app.use(notFound)

export default app
