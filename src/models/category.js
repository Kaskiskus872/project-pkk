import { DataTypes } from 'sequelize';
import sequelize from '../config/supabaseClient.js';

/**
 * Fungsi init model Product
 * @param {Sequelize} sequelize 
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
