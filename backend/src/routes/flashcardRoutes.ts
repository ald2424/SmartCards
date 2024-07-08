import { Router } from 'express';
import { createFlashcard, getFlashcards, updateFlashcard, deleteFlashcard } from '../controllers/flashcardController';

const router = Router();

router.post('/', createFlashcard);
router.get('/:categoryId', getFlashcards);
router.put('/:id', updateFlashcard);
router.delete('/:id', deleteFlashcard);

export default router;