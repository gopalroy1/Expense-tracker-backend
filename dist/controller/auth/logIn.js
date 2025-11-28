"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../../config/db");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // Find user by email
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Verify password
        const isValid = await (0, hash_1.comparePassword)(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT
        const token = (0, jwt_1.generateToken)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Send to frontend
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
