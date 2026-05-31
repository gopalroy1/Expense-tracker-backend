const findBodyData = (payload: any): string | null => {
    if (payload?.body?.data) {
        return payload.body.data;
    }
    if (payload?.parts) {
        // Prefer HTML, then plain text
        for (const mimeType of ["text/html", "text/plain"]) {
            for (const part of payload.parts) {
                if (part.mimeType === mimeType && part.body?.data) {
                    return part.body.data;
                }
            }
        }
        // Recurse into nested multipart parts
        for (const part of payload.parts) {
            if (part.parts) {
                const nested = findBodyData(part);
                if (nested) return nested;
            }
        }
    }
    return null;
};

const trimBody = (raw: string): string =>
    raw
        .replace(/\r\n/g, "\n")
        .replace(/^-{4,}.*$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

export const extractEmailFields = (message: any) => {
    const headers: Array<{ name: string; value: string }> =
        message.payload?.headers || [];

    const getHeader = (name: string) =>
        headers.find((h) => h.name.toLowerCase() === name.toLowerCase())
            ?.value ?? null;

    const bodyData = findBodyData(message.payload);
    const body = bodyData
        ? trimBody(Buffer.from(bodyData, "base64url").toString("utf-8"))
        : null;

    return {
        gmailMessageId: message.id as string,
        sender: getHeader("from"),
        subject: getHeader("subject"),
        snippet: (message.snippet as string) || null,
        body,
        receivedAt: new Date(Number(message.internalDate)),
    };
};
