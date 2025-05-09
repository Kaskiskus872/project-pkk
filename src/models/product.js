import { DataTypes } from 'sequelize';
import sequelize from '../config/supabaseClient.js';
import Category from './category.js';

/**
 * Fungsi init model Product
 * @param {Sequelize} sequelize 
 * @returns {Model}
 */

export default (sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });

  // Relasi dengan Category
  Product.belongsTo(Category(sequelize), { foreignKey: 'CategoryId', onDelete: 'SET NULL' });

  return Product;
};
