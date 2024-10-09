import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // Importing database connection function

// Load environment variables
dotenv.config();

// Express app initialization
const app = express();

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add if you're working with JSON requests

// CORS setup
app.use(cors({
    origin: process.env.DEV_CLIENT_URL
}));

// MongoDB Connection
connectDB();

// Define basic route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveris veikia: http://127.0.0.1:${PORT}`);
});