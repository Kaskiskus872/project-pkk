import { DataTypes } from 'sequelize';
import sequelize from '../config/supabaseClient.js';
import Cart from './cart.js';
import Product from './product.js';

/**
 * Fungsi init model CartItem
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  // Relasi dengan Cart dan Product
  CartItem.belongsTo(Cart(sequelize), { foreignKey: 'CartId', onDelete: 'CASCADE' });
  CartItem.belongsTo(Product(sequelize), { foreignKey: 'ProductId', onDelete: 'CASCADE' });

  return CartItem;
};
