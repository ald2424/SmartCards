import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

router.route("/").post(protect, createCategory).get(protect, getCategories);

router
  .route("/:id")
  .delete(protect, deleteCategory)
  .put(protect, updateCategory);

export default router;