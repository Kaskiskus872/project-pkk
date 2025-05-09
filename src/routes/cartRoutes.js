import express from 'express';
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for cart
router.get('/', verifyUser, getCartItems);
router.post('/', verifyUser, addItemToCart);
router.put('/:id', verifyUser, updateCartItem);
router.delete('/:id', verifyUser, removeCartItem);

export default router;