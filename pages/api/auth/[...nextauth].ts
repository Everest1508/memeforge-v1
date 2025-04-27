// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { Session, User } from "next-auth"; // Import the correct types for session and user

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      // Add user ID to the session directly
      if (user?.id) {
        session.user.id = user.id;  // user.id will be available after login
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
