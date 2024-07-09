import { Request, Response } from "express";
import { Flashcard } from "../models/Flashcard";
import errorHandler from "../middlewares/errorHandler";

export const createFlashcard = errorHandler(
  async (req: Request, res: Response) => {
    const { question, shortAnswer, longAnswer, category } = req.body;
    const flashcard = new Flashcard({
      question,
      shortAnswer,
      longAnswer,
      category,
    });
    await flashcard.save();
    res.status(201).json(flashcard);
  }
);

export const getFlashcards = errorHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const flashcards = await Flashcard.find({ category: categoryId });
    res.status(200).json(flashcards);
  }
);

export const updateFlashcard = errorHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, shortAnswer, longAnswer, category } = req.body;
    const flashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, shortAnswer, longAnswer, category },
      { new: true }
    );
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found." });
    }
    res.status(200).json(flashcard);
  }
);

export const deleteFlashcard = errorHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Deleting flashcard with ID: ${id}`);
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) {
      console.log(`Flashcard not found.`);
      return res.status(404).json({ message: "Flashcard not found." });
    }
    console.log(`flashcard deleted: `, flashcard);
    res.status(200).json({ message: "Flashcard deleted" });
  }
);
