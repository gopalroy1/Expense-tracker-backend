import { prisma } from "../../config/db";

export const markDaysAsSynced = async (
    userId: string,
    days: Date[]
): Promise<void> => {
    if (days.length === 0) return;

    await prisma.syncedDay.createMany({
        data: days.map((date) => ({ userId, date })),
        skipDuplicates: true,
    });
};
