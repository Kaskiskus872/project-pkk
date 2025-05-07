import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer to handle file uploads directly in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for products
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), verifyAdmin, createProduct);
router.put('/:id', upload.single('image'), verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);

export default router;