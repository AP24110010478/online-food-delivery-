import asyncHandler from 'express-async-handler';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import Restaurant from '../models/Restaurant.js';
import calculateOrderTotal from '../utils/calculateOrderTotal.js';
import { canTransition } from '../utils/orderStatusUpdater.js';

export const createOrder = asyncHandler(async (req, res) => {
  const menuIds = req.body.items.map((item) => item.menuItem);
  const menuItems = await MenuItem.find({ _id: { $in: menuIds }, restaurant: req.body.restaurant });
  const orderItems = req.body.items.map((entry) => {
    const menuItem = menuItems.find((item) => item._id.equals(entry.menuItem));
    if (!menuItem) throw new Error('Invalid menu item');
    return { menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: entry.quantity };
  });
  const totals = calculateOrderTotal(orderItems);
  const order = await Order.create({ customer: req.user._id, restaurant: req.body.restaurant, items: orderItems, address: req.body.address, paymentMethod: req.body.paymentMethod, paymentStatus: req.body.paymentMethod === 'cash' ? 'pending' : 'paid', ...totals });
  await Payment.create({ order: order._id, user: req.user._id, provider: req.body.paymentMethod, amount: order.total, status: req.body.paymentMethod === 'cash' ? 'created' : 'paid', providerPaymentId: `mock_${Date.now()}` });
  const populated = await Order.findById(order._id).populate('restaurant items.menuItem deliveryStaff');
  res.status(201).json({ order: populated });
});

export const getOrders = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.user.role === 'customer') filter = { customer: req.user._id };
  if (req.user.role === 'delivery') filter = { deliveryStaff: req.user._id };
  if (req.user.role === 'restaurant') {
    const restaurants = await Restaurant.find({ owner: req.user._id }).select('_id');
    filter = { restaurant: { $in: restaurants.map((restaurant) => restaurant._id) } };
  }
  const orders = await Order.find(filter).populate('restaurant items.menuItem customer deliveryStaff').sort('-createdAt');
  res.json({ orders });
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('restaurant items.menuItem customer deliveryStaff');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (req.user.role === 'customer' && !order.customer._id.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not allowed');
  }
  if (req.user.role === 'delivery' && order.deliveryStaff && !order.deliveryStaff._id.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not allowed');
  }
  if (req.user.role === 'restaurant') {
    const ownsRestaurant = await Restaurant.exists({ _id: order.restaurant._id, owner: req.user._id });
    if (!ownsRestaurant) {
      res.status(403);
      throw new Error('Not allowed');
    }
  }
  res.json({ order });
});

export const getAssignedOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ $or: [{ deliveryStaff: req.user._id }, { deliveryStaff: null, status: { $in: ['preparing', 'out_for_delivery'] } }] }).populate('restaurant items.menuItem customer');
  res.json({ orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (req.user.role === 'restaurant') {
    const ownsRestaurant = await Restaurant.exists({ _id: order.restaurant, owner: req.user._id });
    if (!ownsRestaurant) {
      res.status(403);
      throw new Error('Not allowed');
    }
  }
  if (!canTransition(order.status, req.body.status, req.user.role)) {
    res.status(400);
    throw new Error('Invalid status transition');
  }
  order.status = req.body.status;
  if (req.user.role === 'delivery' && !order.deliveryStaff) order.deliveryStaff = req.user._id;
  if (order.status === 'delivered' && order.paymentMethod === 'cash') order.paymentStatus = 'paid';
  await order.save();
  const populated = await Order.findById(order._id).populate('restaurant items.menuItem customer deliveryStaff');
  res.json({ order: populated });
});
