"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./product.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const router = express_1.default.Router();
router.use('/api/profile/cart', cart_route_1.default);
router.use('/api/products', product_route_1.default);
exports.default = router;
