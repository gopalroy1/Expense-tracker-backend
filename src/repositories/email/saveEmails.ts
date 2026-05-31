import { prisma } from "../../config/db";

interface EmailData {
    userId: string;
    gmailMessageId: string;
    sender: string | null;
    subject: string | null;
    snippet: string | null;
    body: string | null;
    receivedAt: Date;
}

export const saveEmails = async (emails: EmailData[]) => {
    return prisma.email.createMany({
        data: emails,
        skipDuplicates: true,
    });
};
