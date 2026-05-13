import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';

export const getRestaurantReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate('user', 'name').sort('-createdAt');
  res.json({ reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id });
  const populated = await Review.findById(review._id).populate('user', 'name');
  res.status(201).json({ review: populated });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  if (!review.user.equals(req.user._id) && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not allowed');
  }
  await review.deleteOne();
  res.json({ message: 'Review deleted' });
});
