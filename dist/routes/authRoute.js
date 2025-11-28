"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isLoggedIn_1 = require("../controller/auth/isLoggedIn");
const logIn_1 = require("../controller/auth/logIn");
const logout_1 = require("../controller/auth/logout");
const singUp_1 = require("../controller/auth/singUp");
const authMiddleware_1 = require("../middleware/authMiddleware");
const authRoutes = (0, express_1.Router)();
// Create User / Sign Up
authRoutes.post("/signup", singUp_1.signup);
authRoutes.post("/login", logIn_1.login);
authRoutes.post("/logout", logout_1.logout);
authRoutes.get("/isloggedin", authMiddleware_1.authMiddleware, isLoggedIn_1.isLoggedIn);
exports.default = authRoutes;
