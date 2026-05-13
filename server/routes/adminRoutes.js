import { Router } from 'express';
import { overview, setRestaurantStatus, setUserActive } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();
router.use(protect, authorize('admin'));
router.get('/overview', overview);
router.patch('/users/:id/active', setUserActive);
router.patch('/restaurants/:id/status', setRestaurantStatus);
export default router;
