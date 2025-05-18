import express from 'express';
const router = express.Router();
import orderController from '../controllers/orderController.js';
import { verifyAdmin, verifyUser } from '../middleware/authMiddleware.js';

// Buat order baru
router.post('/', verifyUser, orderController.createOrder);

// Ambil semua order milik user
router.get('/user/:userId', orderController.getUserOrders);

// Ambil detail order tertentu
router.get('/:orderId', orderController.getOrderById);

// Update status order
router.put('/:orderId/status', verifyUser, orderController.updateOrderStatus);

// Hapus order (opsional)
router.delete('/:orderId', orderController.deleteOrder);

export default router;
