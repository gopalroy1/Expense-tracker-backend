import axios from "axios";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { FRONTEND_DASHBOARD_URL } from "../../constants/urls";
import { generateToken } from "../../utils/jwt";

export const googleCallBack = async (req: any, res: any) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).send("Missing authorization code");
        }

        // Exchange code for tokens
        const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            }
        );

        const { access_token, id_token, refresh_token } = tokenResponse.data;

        if (!id_token) {
            return res.status(400).send("Invalid response from Google: missing id_token");
        }

        const googleUser = jwt.decode(id_token) as { email?: string; name?: string; sub?: string };

        if (!googleUser?.email) {
            return res.status(400).send("Invalid response from Google: missing email");
        }

        // Find or create user
        let user = await prisma.user.findUnique({ where: { email: googleUser.email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name || googleUser.email,
                    googleAccessToken: access_token,
                    googleRefreshToken: refresh_token ?? null,
                },
            });
        } else {
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    googleAccessToken: access_token,
                    googleRefreshToken: refresh_token ?? user.googleRefreshToken,
                },
            });
        }

        const appToken = generateToken(user.id);

        res.cookie("token", appToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(FRONTEND_DASHBOARD_URL);
    } catch (err: any) {
        console.error("Google callback error:", err.response?.data || err.message);
        res.status(500).send("Google Login Failed");
    }
};
