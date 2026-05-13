import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('restaurant items.menuItem');
  res.json({ cart });
});

export const saveCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { restaurant: req.body.restaurant, items: req.body.items },
    { new: true, upsert: true }
  ).populate('restaurant items.menuItem');
  res.json({ cart });
});

export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: 'Cart cleared' });
});
