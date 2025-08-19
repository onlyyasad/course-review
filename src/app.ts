import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

//parser
app.use(express.json())
app.use(cors())

const test = async (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', test)

export default app
