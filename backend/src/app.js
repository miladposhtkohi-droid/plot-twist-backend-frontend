import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
const app = express();
import { connectToDatabase } from "./config/database.js";

// Middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(err);
  }
});
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Webbshop API test",
    stack: "MEN (MongoDB, Express, Node.js)",
  });
});

// Routes index
app.use("/api", routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
