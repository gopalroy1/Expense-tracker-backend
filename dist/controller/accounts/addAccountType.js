"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccountType = void 0;
const db_1 = require("../../config/db");
// POST /account/type
const addAccountType = async (req, res) => {
    try {
        // console.log("The req ",{req})
        //@ts-ignore
        const userId = req.user.userId; // from auth middleware
        console.log("userId from the middleware", userId);
        const { type } = req.body;
        if (!type) {
            return res.status(400).json({ error: "Account type is required" });
        }
        const accountType = await db_1.prisma.accountType.create({
            data: {
                userId,
                type,
            },
        });
        res.json({ message: "Account type created", accountType });
    }
    catch (err) {
        if (err.code === "P2002") {
            return res
                .status(400)
                .json({ error: "This account type already exists for this user" });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.addAccountType = addAccountType;
