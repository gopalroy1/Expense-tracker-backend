import { prisma } from "../../config/db";

export const findTransactionsByUserId = async (
    userId: string,
    from?: Date,
    to?: Date
) => {
    return prisma.transaction.findMany({
        where: {
            userId,
            ...(from && to ? { transactionDate: { gte: from, lte: to } } : {}),
        },
        orderBy: { transactionDate: "desc" },
    });
};
