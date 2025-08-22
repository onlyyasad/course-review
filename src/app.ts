import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'

const app = express()

//parser
app.use(express.json())
app.use(cors())

//application routes

app.use('/api/v1', router)

const test = async (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', test)

app.use(notFound)

export default app
