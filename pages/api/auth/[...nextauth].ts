import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { Session, User, Account, Profile } from "next-auth";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
    }),
  ],

  // Use JWT sessions
  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    // Add user ID to the token
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    // Add token info to session
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
