import { AxiosInstance } from "axios";
import { GmailAuthError } from "../errors/GmailAuthError";

export const getMessage = async (
    client: AxiosInstance,
    messageId: string
): Promise<any> => {
    try {
        const response = await client.get(`/users/me/messages/${messageId}`, {
            params: { format: "full" },
        });
        return response.data;
    } catch (err: any) {
        if (err.response?.status === 401) throw new GmailAuthError();
        throw err;
    }
};
