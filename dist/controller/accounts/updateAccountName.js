"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountName = void 0;
const db_1 = require("../../config/db");
const updateAccountName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const updated = await db_1.prisma.accountName.update({
            where: { id },
            data: { name },
        });
        res.json({ message: "Account name updated", updated });
    }
    catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json({ error: "Name must be unique for this type" });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateAccountName = updateAccountName;
