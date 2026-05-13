import { Router } from 'express';
import { addMenuItem, deleteMenuItem, updateMenuItem } from '../controllers/menuController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();
router.post('/:restaurantId', protect, authorize('restaurant', 'admin'), upload.single('foodImage'), addMenuItem);
router.put('/item/:id', protect, authorize('restaurant', 'admin'), upload.single('foodImage'), updateMenuItem);
router.delete('/item/:id', protect, authorize('restaurant', 'admin'), deleteMenuItem);
export default router;
