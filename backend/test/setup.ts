import dotenv from "dotenv";
import path from "path";

// Ensure dotenv loads the correct .env.test file
const envPath = path.resolve(__dirname, "../.env.test");
dotenv.config({ path: envPath });

console.log(`MONGO_URI_TEST from .env.test: ${process.env.MONGO_URI_TEST}`);

// Import mongoose and connectDB after ensuring the environment variables are loaded
import mongoose from "mongoose";
import connectDB from "../src/config/database";

beforeAll(async () => {
  console.log("Running beforeAll hook");
  await connectDB(process.env.MONGO_URI_TEST!);
});

afterAll(async () => {
  console.log("Running afterAll hook");
  await mongoose.connection.close();
});
