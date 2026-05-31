import { prisma } from "../../config/db";

export const getSyncedDays = async (
    userId: string,
    from: Date,
    to: Date
): Promise<Date[]> => {
    const rows = await prisma.syncedDay.findMany({
        where: { userId, date: { gte: from, lte: to } },
        select: { date: true },
    });
    return rows.map((r) => r.date);
};
