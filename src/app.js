import sequelize from './config/supabaseClient.js'
import './models/index.js';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

const initializeDatabase = async () => {
    try {
        // Initialize the database connection
        // await sequelize.sync({ alter: true }); 
        await sequelize.authenticate();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
initializeDatabase();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Auth routes
app.use('/auth', authRoutes);

// Product routes
app.use('/products', productRoutes);

// Category routes
app.use('/categories', categoryRoutes);

// Cart routes
app.use('/cart', cartRoutes);

// Rating routes
app.use('/ratings', ratingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

export default app;