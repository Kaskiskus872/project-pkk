import { Rating, User } from '../models/index.js';
import Product from '../models/product.js';

// Create a new rating for a product
export const createRating = async (req, res) => {
  try {
    const { productId } = req.params;
    if (isNaN(productId)) {
      return res.status(400).json({ message: 'productId harus berupa angka.' });
    }
    const { rating, feedback } = req.body;
    const userId = req.user.id; // Pastikan user sudah login dan userId tersedia di req.user

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating harus antara 1 sampai 5.' });
    }
    if (!feedback) {
      return res.status(400).json({ message: 'Feedback tidak boleh kosong.' });
    }

    const newRating = await Rating.create({
      rating,
      feedback,
      userId,
      productId,
    });
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error); // Tambahkan log error detail ke console
    res.status(500).json({ message: 'Gagal menambah rating', error: error.message });
  }
};

// Get all ratings for a product (with username)
export const getRatingsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.findAll({
      where: { productId },
      include: [{ model: User, as: 'user', attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil rating', error });
  }
};

// Mendapatkan rata-rata rating untuk semua produk
export const getAllProductAvgRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      attributes: [
        'productId',
        [Rating.sequelize.fn('AVG', Rating.sequelize.col('rating')), 'avgRating']
      ],
      group: ['productId']
    });
    // Ubah hasil ke array JS biasa
    const result = ratings.map(r => ({
      productId: r.productId,
      avgRating: parseFloat(r.get('avgRating'))
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil rata-rata rating', error: error.message });
  }
};
