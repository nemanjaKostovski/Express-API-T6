"use strict";
// This file will define the routes for accessing product-related endpoints in your API. It will map HTTP methods (GET, POST, PUT, DELETE) to specific controller functions. This helps organize your API endpoints and keeps the code modular
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
// Define routes for product-related endpoints
router.get('/', product_controller_1.default.getAllProducts);
router.get('/:productId', product_controller_1.default.getProductById);
exports.default = router;
