"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNetworthEntry = void 0;
const db_1 = require("../../config/db");
const addNetworthEntry = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const { accountType, accountName, balance, snapshotDate } = req.body;
        if (!accountType || !accountName || balance === undefined || !snapshotDate) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const entry = await db_1.prisma.networthEntry.create({
            data: {
                userId,
                accountType,
                accountName,
                balance,
                snapshotDate: new Date(snapshotDate),
            },
        });
        return res.status(201).json({ message: "Entry added", entry });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding entry" });
    }
};
exports.addNetworthEntry = addNetworthEntry;
