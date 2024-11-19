/*import express from 'express';
import { connectDB } from './config/db.js';
import { apiRoute } from './routes/index.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;

connectDB();


app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://frontend-virid-one-14.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] 
}));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api', apiRoute);

if (process.env.NODE_ENV !== 'production') {
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}


export default app;

/*
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
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Dynamic CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      /\.vercel\.app$/, // Allow all Vercel URLs
    ];
    const isAllowed = allowedOrigins.some((pattern) =>
      typeof pattern === "string"
        ? pattern === origin
        : pattern.test(origin)
    );

    if (isAllowed || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Debugging Middleware
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

// Default Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API Routes
app.use('/api', apiRoute);

// Start Server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
