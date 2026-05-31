import { prisma } from "../../config/db";

export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({ where: { id: userId } });
};
