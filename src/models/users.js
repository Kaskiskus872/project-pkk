import sequelize from '../config/supabaseClient.js';
import { DataTypes } from 'sequelize';


/**
 * Fungsi init model Product
 * @param {Sequelize} sequelize 
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true, // Tidak boleh kosong
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Harus format email
        notEmpty: true, // Tidak boleh kosong
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Tidak boleh kosong
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer'),
      defaultValue: 'customer',
      validate: {
        isIn: [['admin', 'customer']], // Hanya boleh admin atau customer
      },
    },
  }, {
    timestamps: true,  // Menyimpan createdAt dan updatedAt
  });
};
