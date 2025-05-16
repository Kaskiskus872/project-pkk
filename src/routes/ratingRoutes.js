import express from 'express';
import { createRating, getRatingsByProduct, getAllProductAvgRatings } from '../controllers/ratingController.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tambah rating ke produk tertentu (user harus login)
router.post('/:productId', verifyUser, createRating);

// Ambil rata-rata rating semua produk
router.get('/all', getAllProductAvgRatings);

// Ambil semua rating untuk produk tertentu
router.get('/:productId', getRatingsByProduct);

export default router;
