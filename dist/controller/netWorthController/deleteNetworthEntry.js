"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNetworthEntry = void 0;
const db_1 = require("../../config/db");
const deleteNetworthEntry = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const { id } = req.params;
        const entry = await db_1.prisma.networthEntry.findUnique({ where: { id } });
        if (!entry || entry.userId !== userId) {
            return res.status(404).json({ message: "Entry not found" });
        }
        await db_1.prisma.networthEntry.delete({
            where: { id },
        });
        return res.json({ message: "Entry deleted" });
    }
    catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ message: "Error deleting entry" });
    }
};
exports.deleteNetworthEntry = deleteNetworthEntry;
