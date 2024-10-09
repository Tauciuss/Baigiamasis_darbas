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
        unique: true, //Nurodymas, jog kolekcijoje ši reikšmė privalės būti unikali (t.y nesikartoti)
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Įveskite galiojantį el. pašto adresą"] // El. pasto adreso formato validavimas
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    billNumber:{
        type: number,
        required: true
    },
    idNumber:{
        type: number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    // Nurodymas, kad papildoma info būtų įtraukta į JSON stringą
    toJSON: {
        virtuals: true
    }
});

// Users modelis
export default mongoose.model('User', UserSchema);