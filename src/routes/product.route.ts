// This file will define the routes for accessing product-related endpoints in your API. It will map HTTP methods (GET, POST, PUT, DELETE) to specific controller functions. This helps organize your API endpoints and keeps the code modular

import express, { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router: Router = express.Router();

// Define routes for product-related endpoints
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);

export default router;
