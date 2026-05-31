import { Request, Response } from "express";

export const googleLogInStart = (req: Request, res: Response) => {
  console.log("Google Login Start called");
    const scope = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/gmail.readonly"
  ].join(" ");

  const redirectUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=consent`;

  console.log('Redirecting user to ',{redirectUrl})
  res.redirect(redirectUrl);
}