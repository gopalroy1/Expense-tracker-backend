export class GmailAuthError extends Error {
    constructor() {
        super("Please reconnect your Gmail account");
        this.name = "GmailAuthError";
        Object.setPrototypeOf(this, GmailAuthError.prototype);
    }
}
