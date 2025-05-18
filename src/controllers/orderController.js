import { Order, OrderItem, Product } from '../models/index.js';

// Membuat order baru beserta order items
export const createOrder = async (req, res) => {
  try {
    if (!req.body || !req.body.items || !req.body.total) {
      return res.status(400).json({ error: 'Request body harus berisi items dan total.' });
    }
    const userId = req.user.id; // Ambil userId dari token
    const { items, total } = req.body; // items: [{productId, quantity, price}]
    const order = await Order.create({ UserId: userId, totalPrice: total, status: 'pending' });
    const orderItems = await Promise.all(
      items.map(item =>
        OrderItem.create({
          OrderId: order.id,
          ProductId: item.productId,
          quantity: item.quantity,
          price: item.price
        })
      )
    );
    res.status(201).json({ order, orderItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    if (!req.params || !req.params.userId) {
      return res.status(400).json({ error: 'userId harus ada di params.' });
    }
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { UserId: userId }, include: [OrderItem] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    if (!req.params || !req.params.orderId) {
      return res.status(400).json({ error: 'orderId harus ada di params.' });
    }
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId, { include: [OrderItem] });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    if (!req.params || !req.params.orderId) {
      return res.status(400).json({ error: 'orderId harus ada di params.' });
    }
    if (!req.body || !req.body.status) {
      return res.status(400).json({ error: 'Request body harus berisi status.' });
    }
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    // Only allow owner or admin
    if (req.user.role !== 'admin' && order.UserId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own order.' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    if (!req.params || !req.params.orderId) {
      return res.status(400).json({ error: 'orderId harus ada di params.' });
    }
    const { orderId } = req.params;
    await OrderItem.destroy({ where: { OrderId: orderId } }); // Perbaiki field relasi
    await Order.destroy({ where: { id: orderId } });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
