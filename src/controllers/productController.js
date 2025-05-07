import { Product } from '../models/index.js';
import { supabase } from '../config/supabaseClient.js';

// Helper function to upload image to Supabase
const uploadImageToSupabase = async (file) => {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`products/${Date.now()}_${file.originalname}`, file.path, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${data.path}`;
};

// Helper function to delete image from Supabase
const deleteImageFromSupabase = async (imageUrl) => {
  const imagePath = imageUrl.split('/uploads/')[1];
  await supabase.storage.from('uploads').remove([`products/${imagePath}`]);
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      return res.status(200).json({ message: 'Get all products success, no product found', data: [] });
    }
    res.status(200).json({ message: 'Get all products success', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Get product by ID success, product not found' });
    }
    res.status(200).json({ message: 'Get product by ID success', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    let imageUrl = null;
    if (req.file) {
      const timestampedFileName = `${Date.now()}_${req.file.originalname}`;

      // Upload image to Supabase directly from memory
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(`products/${timestampedFileName}`, req.file.buffer, {
          contentType: req.file.mimetype, // Ensure correct MIME type
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      console.log('Supabase upload response:', data);
      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/products/${encodeURIComponent(timestampedFileName)}`;
      console.log('Generated Image URL:', imageUrl);
    }

    // Create product in database
    const product = await Product.create({
      name,
      price,
      description,
      stock,
      imageUrl,
    });

    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// Update product with optional image update
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Update product failed, product not found' });
    }

    let imageUrl = product.imageUrl; // Use existing image URL by default

    if (req.file) {
      // Delete old image from Supabase if a new image is uploaded
      if (product.imageUrl) {
        const imagePath = product.imageUrl.split('/uploads/')[1];
        await supabase.storage.from('uploads').remove([`products/${imagePath}`]);
      }

      // Upload new image to Supabase directly from memory
      const timestampedFileName = `${Date.now()}_${req.file.originalname}`;
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(`products/${timestampedFileName}`, req.file.buffer, {
          contentType: req.file.mimetype, // Ensure correct MIME type
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/products/${encodeURIComponent(timestampedFileName)}`;
    }

    // Update product details
    await product.update({
      name,
      price,
      description,
      stock,
      imageUrl,
    });

    res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete product and its image
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Delete product failed, product not found' });
    }

    // Delete image from Supabase
    if (product.imageUrl) {
      await deleteImageFromSupabase(product.imageUrl);
    }

    // Delete product from database
    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};