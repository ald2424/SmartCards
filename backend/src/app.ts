import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import flashcardRoutes from "./routes/flashcardRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/flashcards", flashcardRoutes);

export default app;
