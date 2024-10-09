import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // Duomenu bazes prisijungimas

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(cors({
    origin: process.env.DEV_CLIENT_URL
}));

connectDB();

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveris veikia: http://127.0.0.1:${PORT}`);
});