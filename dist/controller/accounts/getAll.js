"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccounts = void 0;
const db_1 = require("../../config/db");
const getAllAccounts = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const accountTypes = await db_1.prisma.accountType.findMany({
            where: { userId },
            include: {
                accountNames: true, // includes all linked account names
            },
            orderBy: {
                type: "asc", // optional: alphabetical sorting
            },
        });
        return res.json({ accountTypes });
    }
    catch (err) {
        console.error("Error fetching account structure:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllAccounts = getAllAccounts;
