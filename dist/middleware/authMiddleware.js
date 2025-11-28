"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    console.log("auth middleware called");
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Not authenticated middleware" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // store user id in request
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
