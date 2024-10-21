import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import user from "./controllers/user.js";
import account from "./controllers/account.js";

const config = dotenv.config().parsed;

// Function to start the server
const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Prisijungėte prie duomenų bazės!");
  } catch (error) {
    console.error("Nepavyko prisijungti prie duomenų bazės:", error);
    return;
  }

  // Initialize Express application
  const app = express();

  app.set("trust proxy", 1); // Trust first proxy

  // Configure session middleware
  app.use(
    session({
      secret: "keyboard cat", // Change this secret for production
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    })
  );

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  // CORS configuration
  const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"]
  app.use(
    cors({
      origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    })
  );


  app.use("/photos", express.static("./uploads"));

  app.use("/api/user", user); // User routes
  app.use("/api/account", account); //Account routes

  // Start the server
  app.listen(config.DEV_PORT, () => {
    console.log(`Serveris veikia ant: ${config.DEV_PORT} porto`);
  });
};

startServer();