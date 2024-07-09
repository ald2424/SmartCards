import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import globalErrorHandler from './middlewares/globalErrorHandler';
import connectDB from "./config/database";
import categoryRoutes from './routes/categoryRoutes';
import flashcardRoutes from './routes/flashcardRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/categories', categoryRoutes);
app.use('/api/flashcards', flashcardRoutes);

app.use(globalErrorHandler);

export default app;