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
const cart_model_1 = __importDefault(require("../models/cart.model"));
class CartRepository {
    static initModel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cartModel = cart_model_1.default;
        });
    }
    static getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('CR get cart ' + userId);
                const cart = yield this.cartModel.findOne({
                    userId: userId,
                    isDeleted: false,
                });
                if (!cart) {
                    return undefined;
                }
                return cart;
            }
            catch (error) {
                console.error('Error fetching cart:', error);
                throw new Error('Failed to fetch cart');
            }
        });
    }
    static createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('CR create cart ' + userId);
                const newCart = new this.cartModel({
                    userId: userId,
                    isDeleted: false,
                    items: [],
                });
                yield newCart.save();
                return newCart;
            }
            catch (error) {
                console.error('Error creating cart:', error);
                throw new Error('Failed to create cart');
            }
        });
    }
    static updateCart(updatedCart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('CC empty cart ' + updatedCart._id);
                const cart = yield this.cartModel.findByIdAndUpdate(updatedCart._id, updatedCart, { new: true });
                if (!cart) {
                    return undefined;
                }
                return cart;
            }
            catch (error) {
                console.error('Error updating cart:', error);
                throw new Error('Failed to update cart');
            }
        });
    }
    static deleteCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.cartModel.deleteOne({
                    userId: userId,
                    isDeleted: false,
                });
                return result.deletedCount === 1;
            }
            catch (error) {
                console.error('Error deleting cart:', error);
                throw new Error('Failed to delete cart');
            }
        });
    }
}
exports.default = CartRepository;
