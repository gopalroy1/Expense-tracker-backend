"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const db_1 = require("../../config/db");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const signup = async (req, res) => {
    try {
        const { name, email, phone, password, city, state, pincode, address, dob } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // Check if user already exists
        const existing = await db_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Hash password
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        // Create user
        const user = await db_1.prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                city,
                state,
                pincode,
                address,
                dob: dob ? new Date(dob) : null,
            },
        });
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Send response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.signup = signup;
