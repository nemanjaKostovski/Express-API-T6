import express, { Router } from 'express';
import productRoutes from './product.route';

const router: Router = express.Router();

// Import and use product routes
router.use('/api/products', productRoutes);

export default router;
