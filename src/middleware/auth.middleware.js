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
exports.authMiddleware = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.header('x-user-id');
        console.log('auth middleware ' + userId);
        if (!userId) {
            return res
                .status(401)
                .json({ data: null, error: { message: 'Token is not provided' } });
        }
        try {
            const user = yield user_service_1.default.getUserById(userId);
            if (!user) {
                return res
                    .status(403)
                    .json({ data: null, error: { message: 'User does not exist' } });
            }
            req.user = user;
            req.isAdmin = true;
            next();
        }
        catch (error) {
            console.error('Error authenticating user:', error);
            return res
                .status(500)
                .json({ data: null, error: { message: 'Internal Server error' } });
        }
    });
}
exports.authMiddleware = authMiddleware;
