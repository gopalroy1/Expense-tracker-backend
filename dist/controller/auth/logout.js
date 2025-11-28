"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/", // MUST match the original path
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
