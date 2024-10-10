import mongoose, { Schema } from 'mongoose';
import validator from 'validator';


const AccountSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    iban: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isIBAN(v);
            },
            message: props => `${props.value} neteisingas IBAN!`
        }
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, "Suma negali būti neigiama"]
    },
    personalID: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                //Asmeninis ID
                return /^\d{11}$/.test(v);
            },
            message: props => `${props.value} neteisingas asmeninis ID!`
        }
    },
    //nuotrauka
    passportCopy: {
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

export default mongoose.model('Account', AccountSchema);