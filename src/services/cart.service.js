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
const cart_repository_1 = __importDefault(require("../repositories/cart.repository"));
const product_service_1 = __importDefault(require("./product.service"));
const order_model_1 = __importDefault(require("../models/order.model"));
class CartService {
    static getOrCreateUserCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user already has a cart
            console.log('CS get or create ' + userId);
            let cart = yield cart_repository_1.default.getCartByUserId(userId);
            // If the user doesn't have a cart, create a new one
            if (!cart) {
                cart = yield cart_repository_1.default.createCart(userId);
            }
            return cart;
        });
    }
    static updateCart(userId, productId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('CS update cart ' + userId);
                let cart = yield cart_repository_1.default.getCartByUserId(userId);
                if (!cart) {
                    return undefined; // Cart not found
                }
                const product = yield product_service_1.default.getProductById(productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                // @ts-ignore
                const itemToAdd = {
                    product: product,
                    count: count,
                };
                const index = cart.items.findIndex((item) => item.product.id === productId);
                if (index !== -1) {
                    cart.items[index].count += count;
                }
                else {
                    cart.items.push(itemToAdd);
                }
                const updatedCart = yield cart_repository_1.default.updateCart(cart);
                return updatedCart;
            }
            catch (error) {
                console.error('Error updating user cart:', error);
                throw new Error('Failed to update user cart');
            }
        });
    }
    static emptyCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user has a cart
                console.log('CS empty cart ' + userId);
                const cart = yield cart_repository_1.default.getCartByUserId(userId);
                if (!cart) {
                    return false; // Cart not found
                }
                // If the cart is already deleted, return true indicating success
                if (cart.isDeleted) {
                    return true;
                }
                // Mark the cart as deleted
                const success = yield cart_repository_1.default.deleteCart(userId);
                return success;
            }
            catch (error) {
                console.error('Error emptying user cart:', error);
                throw new Error('Failed to empty user cart');
            }
        });
    }
    static checkoutCart(userId, orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the cart associated with the user
                console.log('CS checkout cart ' + userId);
                const cart = yield cart_repository_1.default.getCartByUserId(userId);
                // Check if the cart exists and if it has items
                if (!cart || cart.items.length === 0) {
                    throw new Error('Cart is empty');
                }
                // Calculate the total based on the items in the cart
                const total = cart.items.reduce((acc, item) => {
                    return acc + item.product.price * item.count;
                }, 0);
                // Create the order object with necessary details
                const orderData = Object.assign({ userId: userId, cartId: cart._id, items: cart.items, status: 'created', total: total }, orderDetails);
                // Create a new Order instance
                const order = new order_model_1.default(orderData);
                // Save the order to the database
                const savedOrder = yield order.save();
                // Clear the cart after checkout
                yield cart_repository_1.default.deleteCart(userId);
                return savedOrder;
            }
            catch (error) {
                console.error('Error checking out user cart:', error);
                throw new Error('Failed to checkout cart');
            }
        });
    }
}
exports.default = CartService;
