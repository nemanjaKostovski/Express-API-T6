"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../services/cart.service"));
const schemas_joi_1 = require("../schemas.joi");
class CartController {
    static getOrCreateUserCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const cart = yield cart_service_1.default.getOrCreateUserCart(userId);
                return res.status(200).json({ data: cart, error: null });
            }
            catch (error) {
                console.error('Error getting or creating user cart:', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
    static updateCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { productId, count } = req.body;
                yield schemas_joi_1.updateCartSchema.validateAsync(req.body);
                const updatedCart = yield cart_service_1.default.updateCart(userId, productId, count);
                return res.status(200).json({ data: updatedCart, error: null });
            }
            catch (error) {
                console.error('Error updating user cart:', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
    static emptyCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const success = yield cart_service_1.default.emptyCart(userId);
                return res.status(200).json({ data: { success }, error: null });
            }
            catch (error) {
                console.error('Error emptying user cart:', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
    static checkoutCart(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const order = yield cart_service_1.default.checkoutCart(userId, req.body);
                const total = order.items.reduce((acc, item) => {
                    return acc + item.product.price * item.count;
                }, 0);
                // Modify the structure of the returned order object to match the expected format
                const modifiedOrder = {
                    id: order.id,
                    userId: order.userId,
                    cartId: order.cartId,
                    items: order.items.map((item) => ({
                        product: {
                            id: item.product.id,
                            title: item.product.title,
                            description: item.product.description,
                            price: item.product.price,
                        },
                        count: item.count,
                    })),
                    payment: {
                        type: 'paypal',
                        address: 'London',
                        creditCard: '1234-1234-1234-1234',
                    },
                    delivery: {
                        type: 'post',
                        address: 'London',
                    },
                    comments: '',
                    status: 'created',
                    total: total,
                };
                return res.status(200).json({ data: { modifiedOrder }, error: null });
            }
            catch (error) {
                console.error('Error checking out user cart:', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
}
exports.default = CartController;
