import { Router } from "express";
import {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router
   .route("/")
   .post(protect, createFlashcard);

router
  .route("/:id")
  .get(protect, getFlashcards)
  .delete(protect, deleteFlashcard)
  .put(protect, updateFlashcard);

export default router;
