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
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
class ProductService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the ProductRepository to fetch all products
                const products = yield product_repository_1.default.getAllProducts();
                return products;
            }
            catch (error) {
                // Handle errors
                console.error('Error fetching all products:', error);
                throw new Error('Failed to fetch products');
            }
        });
    }
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the ProductRepository to fetch product by ID
                const product = yield product_repository_1.default.getProductById(productId);
                return product;
            }
            catch (error) {
                // Handle errors
                console.error(`Error fetching product with ID ${productId}:`, error);
                throw new Error(`Failed to fetch product with ID ${productId}`);
            }
        });
    }
}
exports.default = ProductService;
