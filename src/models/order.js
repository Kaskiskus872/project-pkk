import { DataTypes } from 'sequelize';
import sequelize from '../config/supabaseClient.js';

/**
 * Fungsi init model Order
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('Order', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
