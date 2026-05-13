import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Order from '../models/Order.js';

export const overview = asyncHandler(async (req, res) => {
  const [users, restaurants, ordersCount] = await Promise.all([
    User.find().select('-password').sort('-createdAt').limit(50),
    Restaurant.find().sort('-createdAt').limit(50),
    Order.countDocuments()
  ]);
  res.json({ users, restaurants, reports: { users: users.length, restaurants: restaurants.length, orders: ordersCount } });
});

export const setUserActive = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select('-password');
  res.json({ user });
});

export const setRestaurantStatus = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json({ restaurant });
});
