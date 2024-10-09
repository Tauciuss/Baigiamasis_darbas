import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/catbank');
        console.log('Prisijungėte prie duomenų bazės!');
    } catch (error) {
        console.error('Nepavyko prisijungti prie duomenų bazės:', error.message);
        process.exit(1);
    }
};

export default connectDB;