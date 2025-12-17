import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const importMonthData = async (req: Request, res: Response) => {
    try {
        const { month, year, targetDate } = req.body;


        if (!month || !year || !targetDate) {
            return res.status(400).json({ error: "Missing fields" });
        }


        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);


        const entries = await prisma.networthEntry.findMany({
            where: {
                snapshotDate: {
                    gte: start,
                    lte: end,
                },
            },
        });
        if(!entries.length) {
            return res.status(400).json({ error: "No entries found for this month" });
        }


        const newDate = new Date(targetDate);


        const duplicated = entries.map(({id,...rest}) => ({
            ...rest,
            snapshotDate: newDate,
        }));


        await prisma.networthEntry.createMany({ data: duplicated });


        return res.json({ message: "Imported successfully", count: duplicated.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};