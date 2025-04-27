import NextAuth, { Session } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Extend the NextAuth User type to include id_str
declare module "next-auth" {
  interface User {
    id_str?: string;
  }
}

export const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET || (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      user.id = user.id_str || ""; 

      // const response = await fetch("http://your-django-backend/api/users/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: user.email,
      //     name: user.name,
      //     twitterId: user.id, // Use the user.id (which is mapped to id_str)
      //   }),
      // });

      // if (response.ok) {
      //   return true;
      // }
      // return false;
      return true; // Allow sign-in for now
    },
    async session({ session, token }: { session: Session, token: any }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
