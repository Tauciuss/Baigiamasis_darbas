import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Account",
  new Schema({
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    secondName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    iban: {
      type: String,
      unique: true,
      required: true,
      minLength: 20,
      maxLength: 34, // IBANs can be up to 34 characters
    },
    idNumber: {
      type: String,
      unique: true,
      required: true,
      minLength: 11,
      maxLength: 11,
    },
    idPhoto: {
      type: String,
      required: false,
    },
    wallet: {
      type: Number,
      default: 0,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);