"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountType = void 0;
const db_1 = require("../../config/db");
const updateAccountType = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;
        if (!type) {
            return res.status(400).json({ error: "Type is required" });
        }
        const updated = await db_1.prisma.accountType.update({
            where: { id },
            data: { type },
        });
        res.json({ message: "Account type updated", updated });
    }
    catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json({ error: "Type must be unique for the user" });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateAccountType = updateAccountType;
