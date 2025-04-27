// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
      version: "2.0",
    }),
  ],
};

// ❗ export default function, not GET or POST
export default NextAuth(authOptions);
