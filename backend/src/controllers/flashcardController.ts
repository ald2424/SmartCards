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

export const updateFlashcard = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { question, shortAnswer, longAnswer, category } = req.body;
        const flashcard = await Flashcard.findByIdAndUpdate(id, { question, shortAnswer, longAnswer, category });
        if(!flashcard){
            return res.status(404).json({ message: 'Flashcard not found.' });
        }
        res.status(200).json(flashcard);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const deleteFlashcard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log( `Deleting flashcard with ID: ${id}`);
        const flashcard = await Flashcard.findByIdAndDelete(id);
        if(!flashcard) {
            console.log(`Flashcard not found.`);
            return res.status(404).json({ message: 'Flashcard not found.' });
        }
        console.log(`flashcard deleted: `, flashcard)
        res.status(200).json({ message: 'Flashcard deleted' });
    } catch(error) {
        console.error(`Error deleting flashcard.`, error);
        res.status(500).json({ message: "Server error", error });
    }
}