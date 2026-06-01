import { prisma } from "../../config/db";

export const findAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            city: true,
            state: true,
            pincode: true,
            address: true,
            dob: true,
            isAdmin: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
