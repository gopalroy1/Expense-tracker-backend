"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworthByMonth = void 0;
const db_1 = require("../../config/db");
const getNetworthByMonth = async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        //@ts-ignore
        const { month, year } = req.query;
        console.log("the month is", month, req?.query);
        if (!month) {
            return res.status(400).json({ message: "month is required (YYYY-MM)" });
        }
        //@ts-ignore
        const start = new Date(Date.UTC(year, month - 1, 1));
        // Start of next month (UTC)
        //@ts-ignore
        const end = new Date(Date.UTC(year, month, 1));
        end.setMonth(end.getMonth() + 1);
        const entries = await db_1.prisma.networthEntry.findMany({
            where: {
                userId,
                snapshotDate: {
                    gte: start,
                    lt: end,
                },
            },
            orderBy: { snapshotDate: "desc" },
        });
        return res.json({ entries });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching monthly entries" });
    }
};
exports.getNetworthByMonth = getNetworthByMonth;
