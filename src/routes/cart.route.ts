import express, { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', CartController.getOrCreateUserCart);
router.post('/', CartController.getOrCreateUserCart);
router.put('/', CartController.updateCart);
router.delete('/', CartController.emptyCart);
router.post('/checkout', CartController.checkoutCart);

export default router;
