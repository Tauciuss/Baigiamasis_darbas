import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    surname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Įveskite galiojantį el. pašto adresą"]
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true
    }
});

export default mongoose.model('User', UserSchema);