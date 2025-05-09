import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for categories
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', verifyAdmin, createCategory);
router.put('/:id', verifyAdmin, updateCategory);
router.delete('/:id', verifyAdmin, deleteCategory);

export default router;