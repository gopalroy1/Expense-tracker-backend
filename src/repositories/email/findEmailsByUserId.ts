import { prisma } from "../../config/db";

export const findEmailsByUserId = async (
    userId: string,
    from?: Date,
    to?: Date
) => {
    return prisma.email.findMany({
        where: {
            userId,
            ...(from && to ? { receivedAt: { gte: from, lte: to } } : {}),
        },
        orderBy: { receivedAt: "desc" },
    });
};
