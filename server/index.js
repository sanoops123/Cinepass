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
  origin: ["http://localhost:5173","https://frontend-cn7lh4f5f-sanoops123s-projects.vercel.app"],
  credentials: true,
  methods:["GET","POST","PUT","DELETE","OPTIONS"]
}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',apiRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})