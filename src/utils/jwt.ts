import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "240d" }); // valid for 8 months
};
