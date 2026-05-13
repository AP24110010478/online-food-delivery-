import { Router } from 'express';
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurants, updateRestaurant } from '../controllers/restaurantController.js';
import { optionalProtect, protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();
router.get('/', optionalProtect, getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', protect, authorize('restaurant', 'admin'), upload.single('restaurantImage'), createRestaurant);
router.put('/:id', protect, authorize('restaurant', 'admin'), upload.single('restaurantImage'), updateRestaurant);
router.delete('/:id', protect, authorize('restaurant', 'admin'), deleteRestaurant);
export default router;
