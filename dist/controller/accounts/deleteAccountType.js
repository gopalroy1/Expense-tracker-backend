"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountType = void 0;
const db_1 = require("../../config/db");
const deleteAccountType = async (req, res) => {
    try {
        const id = req.params.id;
        await db_1.prisma.accountType.delete({ where: { id } });
        res.json({ message: "Account type deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAccountType = deleteAccountType;
