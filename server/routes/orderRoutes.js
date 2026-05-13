import { Router } from 'express';
import { createOrder, getAssignedOrders, getOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();
router.get('/delivery/assigned', protect, authorize('delivery', 'admin'), getAssignedOrders);
router.post('/', protect, authorize('customer'), createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, authorize('restaurant', 'delivery', 'admin'), updateOrderStatus);
export default router;
