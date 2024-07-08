import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import categoryRoutes from './routes/categoryRoutes';
import flashcardRoutes from './routes/flashcardRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const mongoUri = process.env.Mongo_URI;
if(!mongoUri) {
    throw new Error('Mongo_URI is not defined in the environment variables.')
}
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', err => {
    console.log('Error connecting to MongoDB: ', err);
});

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/categories', categoryRoutes);
app.use('/api/flashcards', flashcardRoutes);

export default app;