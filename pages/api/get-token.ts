// pages/api/auth/token.ts
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret, raw: true });

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  // Send token back (optionally filter out sensitive fields)
  return res.status(200).json({ token });
}
