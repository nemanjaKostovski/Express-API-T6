"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authMiddleware);
router.get('/', cart_controller_1.default.getOrCreateUserCart);
router.post('/', cart_controller_1.default.getOrCreateUserCart);
router.put('/', cart_controller_1.default.updateCart);
router.delete('/', cart_controller_1.default.emptyCart);
router.post('/checkout', cart_controller_1.default.checkoutCart);
exports.default = router;
