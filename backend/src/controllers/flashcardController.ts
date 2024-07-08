import { Request, Response } from 'express';
import { Flashcard } from '../models/Flashcard';

export const createFlashcard = async (req: Request, res: Response) => {
    try {
        const { question, shortAnswer, longAnswer, category } = req.body;
        const flashcard = new Flashcard({ question, shortAnswer, longAnswer, category});
        await flashcard.save();
        res.status(201).json(flashcard);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getFlashcards = async (req: Request, res: Response) => {
    try {
        const {categoryId } = req.params;
        const flashcards = await Flashcard.find({ category: categoryId });
        res.status(200).json(flashcards);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
};