import express from 'express'
import { connectDB } from './config/db.js'
import { apiRoute } from './routes/index.js'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
const port = 3000


connectDB()


app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',apiRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})