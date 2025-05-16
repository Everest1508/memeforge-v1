import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { Session, User } from "next-auth";
import { encryptData } from "@/utils/encrypt"; // Adjust path
import axios from "axios";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        const encrypted = encryptData({
          id: token.id,
          name: token.name,
          email: token.email,
        });

        session.user.encrypted = encrypted;
        try {
          await axios.post("https://memeforge.mooo.com/api/user-token/", {}, {
              headers: { Authorization: `Cream ${encrypted}` },
            }
          );
        } catch (error) {
          console.error("Failed to sync user with backend:", error);
        }
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
