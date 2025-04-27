import NextAuth, { Session } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || (() => { throw new Error("TWITTER_CLIENT_ID is not defined"); })(),
      clientSecret: process.env.TWITTER_CLIENT_SECRET || (() => { throw new Error("TWITTER_CLIENT_SECRET is not defined"); })(),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Add the Twitter ID (id_str) to the user object
      user.id = user.id_str || "";  // Provide a fallback value if id_str is undefined

      // Sync user data with Django backend here
      const response = await fetch("http://your-django-backend/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          twitterId: user.id, // Use the user.id (which is mapped to id_str)
        }),
      });

      if (response.ok) {
        return true;
      }
      return false;
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
