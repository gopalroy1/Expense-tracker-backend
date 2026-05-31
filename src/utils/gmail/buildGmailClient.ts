import axios from "axios";

export const buildGmailClient = (accessToken: string) => {
    return axios.create({
        baseURL: "https://gmail.googleapis.com/gmail/v1",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
