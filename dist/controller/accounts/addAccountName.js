"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccountName = void 0;
const db_1 = require("../../config/db");
const addAccountName = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const { accountTypeId, name } = req.body;
        if (!accountTypeId || !name) {
            return res.status(400).json({ error: "accountTypeId and name are required" });
        }
        // Ensure the accountType belongs to the user
        const accountType = await db_1.prisma.accountType.findFirst({
            where: { id: accountTypeId, userId }
        });
        if (!accountType) {
            return res.status(404).json({ error: "Account type not found" });
        }
        const accountName = await db_1.prisma.accountName.create({
            data: {
                accountTypeId,
                name,
            },
        });
        return res.json({
            message: "Account name added",
            accountName,
        });
    }
    catch (err) {
        // Unique constraint for name + accountTypeId
        if (err.code === "P2002") {
            return res.status(400).json({
                error: "This account name already exists under this account type",
            });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.addAccountName = addAccountName;
