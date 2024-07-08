import request from 'supertest';
import app from '../src/app';
import { IFlashcardCreation } from '../src/models/Flashcard';

export const createCategory = async (name: string) => {
    const res = await request(app)
        .post('/api/categories')
        .send({ name });
    return res.body;
};

export const createFlashcard = async (data: IFlashcardCreation) => {
    const res = await request(app)
        .post('/api/flashcards')
        .send(data);
    return res.body;
}