"use strict";
// This file will define the functions that handle HTTP requests related to products.
// It will receive requests from clients, validate the input data, call the appropriate
// functions in the service layer to perform the requested operations, and send back
// the HTTP response with the result
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
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the ProductService to fetch all products
                const products = yield product_service_1.default.getAllProducts();
                // Return the list of products
                return res.status(200).json({ data: products, error: null });
            }
            catch (error) {
                // Handle internal server error
                console.error('Error fetching products:', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                // Call the ProductService to fetch product by ID
                const product = yield product_service_1.default.getProductById(productId);
                // Check if product exists
                if (product) {
                    return res.status(200).json({ data: product, error: null });
                }
                else {
                    // Return 404 if product not found
                    return res
                        .status(404)
                        .json({ data: null, error: { message: 'No product with such id' } });
                }
            }
            catch (error) {
                // Handle internal server error
                console.error('Error fetching product with id', error);
                return res
                    .status(500)
                    .json({ data: null, error: { message: 'Internal Server error' } });
            }
        });
    }
}
exports.default = ProductController;
// Chat GPT on why to use classes
// The decision to use a class-based approach versus a functional approach depends on various factors, including the complexity of the application, the preferred coding style, and the team's familiarity with different paradigms. Here's a brief overview of why you might choose a class-based approach for a controller in an Express application:
// Encapsulation: Classes provide a way to encapsulate related functionality and data into a single unit. In the case of a controller, this can help organize the methods that handle different routes and keep related logic together.
// State Management: While Express routes and middleware functions are inherently stateless, controllers often need to manage state related to the request/response cycle. Classes allow you to encapsulate state within instance properties and easily share it between methods.
// Code Organization: Classes offer a structured way to organize your code. By defining a controller class, you can group related route handling logic together, making it easier to navigate and maintain as the application grows.
// Inheritance and Polymorphism: Although not always necessary in simple Express applications, classes support inheritance and polymorphism, which can be useful for sharing common functionality between controllers or extending existing controllers with additional features.
// That said, there's no strict rule that you must use classes for Express controllers. Functional programming can also be a valid choice, especially for simpler applications or for developers who prefer that style. Ultimately, it comes down to personal preference, team conventions, and the specific requirements of your project. If you prefer a functional approach, you can certainly implement controllers as functions instead of classes.
