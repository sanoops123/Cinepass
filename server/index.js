/*import express from 'express'
import { connectDB } from './config/db.js'
import { apiRoute } from './routes/index.js'
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()
const port = 3000


connectDB()


app.use(express.json())

app.use(cors({
  origin: ["http://localhost:5173","https://frontend-virid-one-14.vercel.app"],
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
  */
import express from 'express';
import { connectDB } from './config/db.js';
import { apiRoute } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = 3000; // Localhost port

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://frontend-virid-one-14.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoute);

// For Local Development (localhost)
if (process.env.NODE_ENV !== 'production') {
  // Only listen for local development, not in Vercel serverless environment
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// For Vercel Serverless Deployment
export default app; // This line will export the app for Vercel's serverless function
