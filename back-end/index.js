import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // Duomenu bazes prisijungimas
import userRoutes from './routes/user.js';
import accountRoutes from './routes/account.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(cors({
    origin: process.env.DEV_CLIENT_URL
}));

connectDB();

// routes
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveris veikia: http://127.0.0.1:${PORT}`);
});