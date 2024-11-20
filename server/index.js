
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
      "https://frontend-virid-one-14.vercel.app", // Main frontend domain
      /^https:\/\/.*\.vercel\.app$/, // Any Vercel subdomain
    ];

    if (!origin || allowedOrigins.some((pattern) => 
      typeof pattern === "string" ? pattern === origin : pattern.test(origin)
    )) {
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

app.get('/health', (req, res) => {
  res.json({ message: 'API is healthy!' });
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
