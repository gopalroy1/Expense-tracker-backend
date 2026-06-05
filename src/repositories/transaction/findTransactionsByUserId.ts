import { prisma } from "../../config/db";

export const findTransactionsByUserId = async (
    userId: string,
    from?: Date,
    to?: Date
) => {
    return prisma.transaction.findMany({
        where: {
            user_id: userId,
            ...(from && to ? { transaction_date: { gte: from, lte: to } } : {}),
        },
        orderBy: { transaction_date: "desc" },
    });
};
