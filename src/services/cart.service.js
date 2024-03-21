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
class CartService {
    static getOrCreateUserCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user already has a cart
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
                // Retrieve the existing cart object for the given user ID from the repository
                let cart = yield cart_repository_1.default.getCartByUserId(userId);
                if (!cart) {
                    return undefined; // Cart not found
                }
                // Find the product with the specified ID from the list of products
                const product = yield product_service_1.default.getProductById(productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                // Find the index of the product in the cart's items array
                const index = cart.items.findIndex((item) => item.product.id === productId);
                if (index !== -1) {
                    // If the product already exists in the cart, update its count
                    cart.items[index].count += count;
                }
                else {
                    // If the product is not already in the cart, add it to the items array
                    cart.items.push({ product, count });
                }
                // Save the updated cart object in the repository
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
            // You can implement the logic to create an order from the cart here
            // This could involve creating a new order entity, updating inventory, etc.
            // For simplicity, let's just return the cart as the order for now
            const cart = yield cart_repository_1.default.getCartByUserId(userId);
            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }
            // Mocking the order creation process
            const order = Object.assign(Object.assign(Object.assign({}, cart), { status: 'created', total: 0 }), orderDetails);
            // Clear the cart after checkout
            yield cart_repository_1.default.deleteCart(userId);
            return order;
        });
    }
}
exports.default = CartService;
