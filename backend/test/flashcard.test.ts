import request from 'supertest';
import app from '../src/app';
import mongoose, { ObjectId } from 'mongoose';
import { createCategory, createFlashcard } from './helpers';
import { ICategory } from '../src/models/Category';
import { IFlashcardCreation } from '../src/models/Flashcard';

import dotenv from 'dotenv';
import connectDB from '../src/config/database';
dotenv.config({ path: "./.env.test" });

let category: ICategory & {_id: ObjectId};
let flashcardData: IFlashcardCreation;

beforeAll(async () => {
  category = await createCategory('Flashcard Test Category') as ICategory & { _id: ObjectId };

  flashcardData = {
    question: "What is a test?",
    shortAnswer: "A procesdure to assess performance.",
    longAnswer:
      "A test is a procedure intended to establish the quality, performance, and reliability of something.",
    category: category._id,
  };
});


describe('Flashcard API', () => {
    it('should create a new flashcard', async () => {
        const flashcard = await createFlashcard(flashcardData);
        expect(flashcard).toHaveProperty('question', 'What is a test?');
    });
    it('should get all flashcards for a category', async () => {
        const res = await request(app)
            .get(`/api/flashcards/${category._id}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('should update a flashcard', async () => {
        const flashcard = await createFlashcard(flashcardData);

        const res = await request(app)
            .put(`/api/flashcards/${flashcard._id}`)
            .send({
                question: 'Updated Question',
                shortAnswer: 'Updated Short Answer',
                longAnswer: 'Updated Long Answer',
                category: category._id,
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('question', 'Updated Question');
    });
    it('should delete a flashcard', async () => {
        const flashcard = await createFlashcard(flashcardData);

        const res = await request(app)
            .delete(`/api/flashcards/${flashcard._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Flashcard deleted')

    })
})