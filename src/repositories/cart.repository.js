"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
class CartRepository {
    // Load carts data from database.json file
    static loadCartsData() {
        try {
            const data = fs.readFileSync(this.DB_FILE_PATH, 'utf-8');
            const jsonData = JSON.parse(data);
            this.carts = jsonData.carts || [];
        }
        catch (error) {
            console.error('Error loading carts data:', error);
            throw new Error('Failed to load carts data');
        }
    }
    // Save carts data to database.json file
    static saveCartsData() {
        try {
            const jsonData = Object.assign(Object.assign({}, JSON.parse(fs.readFileSync(this.DB_FILE_PATH, 'utf-8'))), { carts: this.carts });
            fs.writeFileSync(this.DB_FILE_PATH, JSON.stringify(jsonData, null, 2));
        }
        catch (error) {
            console.error('Error saving carts data:', error);
            throw new Error('Failed to save carts data');
        }
    }
    static getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadCartsData();
            try {
                const cart = this.carts.find((cart) => cart.userId === userId && !cart.isDeleted);
                if (cart === null || cart === void 0 ? void 0 : cart.isDeleted) {
                    return undefined;
                }
                if (cart) {
                    return cart;
                }
                return yield this.createCart(userId);
            }
            catch (error) {
                console.error('Error fetching cart:', error);
                throw new Error('Failed to fetch cart');
            }
        });
    }
    static createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadCartsData();
            try {
                // Check if the user already has a cart
                const existingCart = this.carts.find((cart) => cart.userId === userId && !cart.isDeleted);
                // If a cart already exists, return it
                if (existingCart) {
                    return existingCart;
                }
                // Create a new cart if one doesn't exist
                const newCart = {
                    id: (0, uuid_1.v4)(),
                    userId,
                    isDeleted: false,
                    items: [],
                };
                this.carts.push(newCart);
                this.saveCartsData();
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
            this.loadCartsData();
            try {
                const index = this.carts.findIndex((cart) => cart.id === updatedCart.id);
                if (index === -1) {
                    throw new Error('Cart not found');
                }
                this.carts[index] = updatedCart;
                this.saveCartsData();
                return updatedCart;
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
                this.loadCartsData();
                const index = this.carts.findIndex((cart) => cart.userId === userId && !cart.isDeleted);
                if (index === -1) {
                    throw new Error('Cart not found');
                }
                // Mark the cart as deleted if it's not already
                if (!this.carts[index].isDeleted) {
                    this.carts[index].isDeleted = true;
                    this.saveCartsData();
                }
                return true;
            }
            catch (error) {
                console.error('Error deleting cart:', error);
                throw new Error('Failed to delete cart');
            }
        });
    }
}
CartRepository.DB_FILE_PATH = './src/repositories/database.json';
CartRepository.carts = [];
exports.default = CartRepository;
