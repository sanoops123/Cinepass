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
/*
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
*/
/*
import express from 'express';
import { connectDB } from './config/db.js';
import { apiRoute } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Dynamic CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development
      "https://frontend-virid-one-14.vercel.app", // Specific frontend domain
      /\.vercel\.app$/, // Any Vercel subdomain
    ];

    const isAllowed = allowedOrigins.some((pattern) =>
      typeof pattern === 'string'
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

// Middleware
app.use(express.json());
app.use(cookieParser());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, CinePass backend is running!');
});

// API Routes
app.use('/api', apiRoute);

// Start the server
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction || !process.env.VERCEL_URL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
*/
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { apiRoute } from './routes/index.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const port = process.env.PORT || 3000;

// Connect to the Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Dynamic CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development
      "https://frontend-virid-one-14.vercel.app", // Specific frontend domain
      /^https:\/\/.*\.vercel\.app$/, // Any Vercel subdomain
    ];

    const isAllowed = allowedOrigins.some((pattern) =>
      typeof pattern === 'string'
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

// Debugging Middleware (Logs Requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, CinePass backend is running!');
});

// API Routes
app.use('/api', apiRoute);

// Handle Errors
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});

// Vercel and Local Environment Setup
const isProduction = process.env.NODE_ENV === 'production';

// Start Server in Local Environment
if (!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export App for Vercel
export default app;
