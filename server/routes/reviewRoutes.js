import { Router } from 'express';
import { createReview, deleteReview, getRestaurantReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/restaurant/:restaurantId', getRestaurantReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);
export default router;
