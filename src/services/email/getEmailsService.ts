import { findEmailsForRange } from "../../repositories/email/findEmailsForRange";
import { getSyncedDays } from "../../repositories/email/getSyncedDays";
import { markDaysAsSynced } from "../../repositories/email/markDaysAsSynced";
import { saveEmails } from "../../repositories/email/saveEmails";
import { findUserById } from "../../repositories/user/findUserById";
import { GmailAuthError } from "../../utils/errors/GmailAuthError";
import { batchFetchMessages } from "../../utils/gmail/batchFetchMessages";
import { buildDateRanges } from "../../utils/gmail/buildDateRanges";
import { buildGmailClient } from "../../utils/gmail/buildGmailClient";
import { extractEmailFields } from "../../utils/gmail/extractEmailFields";
import { listMessages } from "../../utils/gmail/listMessages";

const t = () => Date.now();
const elapsed = (start: number) => `${Date.now() - start}ms`;

const getDaysInRange = (from: Date, to: Date): Date[] => {
    const days: Date[] = [];
    const current = new Date(from);
    while (current <= to) {
        days.push(new Date(current));
        current.setUTCDate(current.getUTCDate() + 1);
    }
    return days;
};

export const getEmailsService = async (
    userId: string,
    from: Date,
    to: Date
) => {
    const serviceStart = t();
    const today = new Date(
        Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
        )
    );

    const allDays = getDaysInRange(from, to);
    console.log(`[email] range: ${from.toISOString().slice(0, 10)} → ${to.toISOString().slice(0, 10)} (${allDays.length} days)`);

    let step = t();
    const syncedDays = await getSyncedDays(userId, from, to);
    console.log(`[email] getSyncedDays → ${syncedDays.length} already synced (${elapsed(step)})`);

    const syncedSet = new Set(syncedDays.map((d) => d.getTime()));
    const unsyncedDays = allDays.filter(
        (d) => d.getTime() === today.getTime() || !syncedSet.has(d.getTime())
    );
    console.log(`[email] unsynced days: ${unsyncedDays.length}`);

    if (unsyncedDays.length > 0) {
        step = t();
        const user = await findUserById(userId);
        console.log(`[email] findUserById (${elapsed(step)})`);
        if (!user?.googleAccessToken) throw new GmailAuthError();

        const client = buildGmailClient(user.googleAccessToken);
        const ranges = buildDateRanges(unsyncedDays);
        console.log(`[email] date ranges to fetch: ${ranges.length}`);

        for (const range of ranges) {
            const rangeLabel = `${range.start.toISOString().slice(0, 10)} → ${range.end.toISOString().slice(0, 10)}`;

            step = t();
            const messageRefs = await listMessages(client, range.start, range.end);
            console.log(`[email] listMessages ${rangeLabel} → ${messageRefs.length} message IDs (${elapsed(step)})`);

            if (messageRefs.length > 0) {
                step = t();
                const messages = await batchFetchMessages(
                    client,
                    messageRefs.map((m) => m.id)
                );
                console.log(`[email] batchFetchMessages → ${messages.length} full messages fetched (${elapsed(step)})`);

                step = t();
                await saveEmails(
                    messages.map((msg) => ({ userId, ...extractEmailFields(msg) }))
                );
                console.log(`[email] saveEmails (${elapsed(step)})`);
            }

            const daysToMark = range.days.filter(
                (d) => d.getTime() !== today.getTime()
            );
            step = t();
            await markDaysAsSynced(userId, daysToMark);
            console.log(`[email] markDaysAsSynced ${daysToMark.length} days (${elapsed(step)})`);
        }
    }

    step = t();
    const result = await findEmailsForRange(userId, from, to);
    console.log(`[email] findEmailsForRange → ${result.length} emails returned (${elapsed(step)})`);
    console.log(`[email] total service time: ${elapsed(serviceStart)}`);

    return result;
};
