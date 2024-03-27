"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./src/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_repository_1 = __importDefault(require("./src/repositories/product.repository"));
const user_repository_1 = __importDefault(require("./src/repositories/user.repository"));
const cart_repository_1 = __importDefault(require("./src/repositories/cart.repository"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(routes_1.default);
server.listen(8000, () => {
    console.log('Server running on http://localhost:8000/');
});
const uri = 'mongodb+srv://nemanjakostovski:XuJj7kpEjyQtSPWm@expressapi.r2tplzb.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI';
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('Successfully connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
product_repository_1.default.initModel();
user_repository_1.default.initModel();
cart_repository_1.default.initModel();
