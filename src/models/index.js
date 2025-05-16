import sequelize from '../config/supabaseClient.js';

// Import semua model sebagai fungsi
import defineUser from './users.js';
import defineProduct from './product.js';
import defineOrder from './order.js';
import defineOrderItem from './orderItem.js';
import defineCategory from './category.js';
import defineCart from './cart.js';
import defineCartItem from './cartItem.js';
import defineRating from './rating.js';

// inisialisasi model
const User = defineUser(sequelize);
const Product = defineProduct(sequelize);
const Order = defineOrder(sequelize);
const OrderItem = defineOrderItem(sequelize);
const Category = defineCategory(sequelize);
const Cart = defineCart(sequelize);
const CartItem = defineCartItem(sequelize);
const Rating = defineRating(sequelize);

// Relasi antar model
User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Relasi Cart dan User
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart berisi banyak item
Cart.hasMany(CartItem, { onDelete: 'CASCADE' });
CartItem.belongsTo(Cart);

// Setiap item di cart adalah product
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// Relasi Rating dan User
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Rating.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
User.hasMany(Rating, { foreignKey: 'userId' });
Product.hasMany(Rating, { foreignKey: 'productId' });

export {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Category,
  Cart,
  CartItem,
  Rating,
};
