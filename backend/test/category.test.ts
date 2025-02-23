import request from 'supertest';
import app  from '../src/app';
import mongoose from 'mongoose';
import { createCategory } from './helpers';
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });


describe('Category API', () => {
    it('should create a new category', async () => {
        const category = await createCategory('Test Category');
        expect(category).toHaveProperty('name', 'Test Category');
    });
    it('should get all categories', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('should update a category', async () => {
        const category = await createCategory('Update Test Category');

        const res = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({ name: 'Updated Category' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', 'Updated Category');
    });
    it('should delete a category', async () => {
        const category = await createCategory('Delete Test Category');

        const res = await request(app)
        .delete(`/api/categories/${category._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Category deleted.')
    });
});