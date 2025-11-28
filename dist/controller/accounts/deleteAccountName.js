"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountName = void 0;
const db_1 = require("../../config/db");
const deleteAccountName = async (req, res) => {
    try {
        console.log("the delete account name api called", req.params.id);
        const id = req.params.id;
        await db_1.prisma.accountName.delete({ where: { id } });
        res.json({ message: "Account name deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAccountName = deleteAccountName;
