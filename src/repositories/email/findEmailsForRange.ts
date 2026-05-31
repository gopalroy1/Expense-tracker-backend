import { prisma } from "../../config/db";

export const findEmailsForRange = async (
    userId: string,
    from: Date,
    to: Date
) => {
    return prisma.email.findMany({
        where: { userId, receivedAt: { gte: from, lte: to } },
        orderBy: { receivedAt: "desc" },
    });
};
