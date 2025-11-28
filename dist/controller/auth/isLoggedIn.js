"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const db_1 = require("../../config/db");
const isLoggedIn = async (req, res) => {
    console.log("is logged in called");
    try {
        if (!req.user) {
            console.log("is logged in not authenticated");
            return res.status(401).json({ error: "Not authenticated api" });
        }
        console.log("The req user form middleware is", req.user);
        const user = await db_1.prisma.user.findUnique({
            //@ts-ignore
            where: { id: req.user?.userId },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (err) {
        console.error("Auth check error:", err);
        res.status(401).json({ error: "Internal server error" });
    }
};
exports.isLoggedIn = isLoggedIn;
