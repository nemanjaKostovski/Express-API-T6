import express, { Router } from 'express';
import productRoutes from './product.route';
import cartRoutes from './cart.route';

const router: Router = express.Router();

router.use('/api/profile/cart', cartRoutes);
router.use('/api/products', productRoutes);

export default router;
