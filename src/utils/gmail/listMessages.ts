import { AxiosInstance } from "axios";
import { GmailAuthError } from "../errors/GmailAuthError";

export const listMessages = async (
    client: AxiosInstance,
    afterDate: Date,
    beforeDate?: Date
): Promise<Array<{ id: string; threadId: string }>> => {
    const afterEpoch = Math.floor(afterDate.getTime() / 1000);
    const beforeEpoch = beforeDate
        ? Math.floor(beforeDate.getTime() / 1000)
        : null;

    const q = beforeEpoch
        ? `after:${afterEpoch} before:${beforeEpoch}`
        : `after:${afterEpoch}`;

    const all: Array<{ id: string; threadId: string }> = [];
    let pageToken: string | undefined;

    try {
        do {
            const params: Record<string, any> = { q, maxResults: 500 };
            if (pageToken) params.pageToken = pageToken;

            const response = await client.get("/users/me/messages", { params });
            all.push(...(response.data.messages || []));
            pageToken = response.data.nextPageToken;
        } while (pageToken);

        console.log(`Fetched ${all.length} messages from Gmail`);
        return all;
    } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403)
            throw new GmailAuthError();
        throw err;
    }
};
