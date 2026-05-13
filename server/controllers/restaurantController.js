import asyncHandler from 'express-async-handler';
import Restaurant from '../models/Restaurant.js';

export const getRestaurants = asyncHandler(async (req, res) => {
  const { search, cuisine, mine } = req.query;
  const filter = {};
  if (mine === 'true') filter.owner = req.user?._id;
  else filter.status = 'approved';
  if (cuisine) filter.cuisine = new RegExp(cuisine, 'i');
  if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { cuisine: new RegExp(search, 'i') }];
  const restaurants = await Restaurant.find(filter).populate('menu').sort('-createdAt');
  res.json({ restaurants });
});

export const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('menu');
  if (!restaurant) {
    res.status(404);
    throw new Error('Restaurant not found');
  }
  res.json({ restaurant });
});

export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.create({ ...req.body, owner: req.user._id, image: req.file ? `/${req.file.path.replaceAll('\\', '/')}` : req.body.image });
  res.status(201).json({ restaurant });
});

export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error('Restaurant not found');
  }
  if (!restaurant.owner.equals(req.user._id) && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not allowed');
  }
  Object.assign(restaurant, req.body);
  if (req.file) restaurant.image = `/${req.file.path.replaceAll('\\', '/')}`;
  await restaurant.save();
  res.json({ restaurant });
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: 'Restaurant deleted' });
});
