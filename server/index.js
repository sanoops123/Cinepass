import express from 'express'
import { connectDB } from './config/db.js'
import { apiRoute } from './routes/index.js'
import cookieParser from "cookie-parser";
const app = express()
const port = 3000


connectDB()

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(cookieParser())

app.use('/api',apiRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})