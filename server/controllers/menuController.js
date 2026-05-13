import asyncHandler from 'express-async-handler';
import MenuItem from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';

async function assertOwner(restaurantId, user) {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) throw new Error('Restaurant not found');
  if (!restaurant.owner.equals(user._id) && user.role !== 'admin') throw new Error('Not allowed');
  return restaurant;
}

export const addMenuItem = asyncHandler(async (req, res) => {
  await assertOwner(req.params.restaurantId, req.user);
  const item = await MenuItem.create({ ...req.body, restaurant: req.params.restaurantId, image: req.file ? `/${req.file.path.replaceAll('\\', '/')}` : req.body.image });
  res.status(201).json({ item });
});

export const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  await assertOwner(item.restaurant, req.user);
  Object.assign(item, req.body);
  if (req.file) item.image = `/${req.file.path.replaceAll('\\', '/')}`;
  await item.save();
  res.json({ item });
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  await assertOwner(item.restaurant, req.user);
  await item.deleteOne();
  res.json({ message: 'Menu item deleted' });
});
