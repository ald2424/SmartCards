import { Router } from 'express';
import { createCategory, getCategories, UpdateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', UpdateCategory);
router.delete('/:id', deleteCategory);

export default router;