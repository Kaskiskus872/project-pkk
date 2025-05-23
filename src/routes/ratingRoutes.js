import express from 'express';
import { createRating, getRatingsByProduct, getAllProductAvgRatings, deleteRating } from '../controllers/ratingController.js';
import { verifyUser, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tambah rating ke produk tertentu (user harus login)
router.post('/:productId', verifyUser, createRating);

// Ambil rata-rata rating semua produk
router.get('/all', getAllProductAvgRatings);

// Ambil semua rating untuk produk tertentu
router.get('/:productId', getRatingsByProduct);

// Hapus rating tertentu (user login, admin bisa hapus semua, user hanya miliknya)
router.delete('/delete/:ratingId', verifyUser, deleteRating);

export default router;
