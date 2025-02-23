import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/database";


dotenv.config();

const PORT = process.env.PORT || 5000;


const mongoURI = process.env.MONGO_URI!;
connectDB(mongoURI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
