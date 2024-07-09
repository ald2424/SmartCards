import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Mongo URI is not defined");
    }
    console.log(`Connecting to MongoDB: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${mongoURI}`);
  } catch (error : any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
