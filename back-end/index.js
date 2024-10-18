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
  // Connect to the database
  try {
    await mongoose.connect(config.MONGO_URL); // No options needed
    console.log("Prisijungėte prie duomenų bazės!");
  } catch (error) {
    console.error("Nepavyko prisijungti prie duomenų bazės:", error);
    return; // Exit if unable to connect to the database
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
  app.use(
    cors({
      origin: config.DEV_CLIENT_URL, // Allow your frontend origin
      credentials: true, // Allow credentials to be sent
    })
  );

  app.use("/photos", express.static("./uploads"));

  app.use("/api/user", user); // User routes
  app.use("/api/account", account); // Client routes

  // Start the server
  app.listen(config.DEV_PORT, () => {
    console.log(`Server running on port ${config.DEV_PORT}`);
  });
};

startServer();