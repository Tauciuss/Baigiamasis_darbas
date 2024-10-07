import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const config = dotenv.config().parsed;

try {

    //await mongoose.connect(config.MONGO_URL);
    await mongoose.connect("mongodb://127.0.0.1:3000/catbank");
    console.log('Prisijungėte!')

    const app = express();

    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: config.DEV_CLIENT_URL
    }));    

    app.listen(3000);

} catch {
    console.log('Prisijungimas nepavyko');
}