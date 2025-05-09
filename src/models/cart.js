import { DataTypes } from 'sequelize';
import sequelize from '../config/supabaseClient.js';
import User from './users.js';

/**
 * Fungsi init model Cart
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
    const Cart = sequelize.define('Cart', {
      // Tidak perlu field tambahan
    });

    // Relasi dengan User
    Cart.belongsTo(User(sequelize), { foreignKey: 'UserId', onDelete: 'CASCADE' });

    return Cart;
};
