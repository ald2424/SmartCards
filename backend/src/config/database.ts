import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    console.log(`Connecting to MongoDB with URI: ${uri}`);
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${uri}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
