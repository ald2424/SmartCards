import { Router } from 'express';
import { createFlashcard, getFlashcards } from '../controllers/flashcardController';

const router = Router();

router.post('/', createFlashcard);
router.get('/:categoryId', getFlashcards);

export default router;