import { AxiosInstance } from "axios";
import { getMessage } from "./getMessage";

export const batchFetchMessages = async (
    client: AxiosInstance,
    messageIds: string[],
    batchSize = 10
): Promise<any[]> => {
    const results: any[] = [];
    for (let i = 0; i < messageIds.length; i += batchSize) {
        const batch = messageIds.slice(i, i + batchSize);
        const messages = await Promise.all(
            batch.map((id) => getMessage(client, id))
        );
        results.push(...messages);
    }
    return results;
};
