import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'ratings',
    timestamps: true,
  });

  return Rating;
};
