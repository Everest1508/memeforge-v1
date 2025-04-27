// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const GET = (req: Request) => {
  return NextAuth({
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        // Uncomment and add your Django integration in the next version
        // const response = await fetch("http://your-django-backend/api/users/", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: user.email,
        //     name: user.name,
        //     twitterId: user.id,
        //   }),
        // });
        //
        // if (response.ok) {
        //   return true;
        // }
        return true;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  });
};

export const POST = (req: Request) => {
  return NextAuth({
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        // Uncomment and add your Django integration in the next version
        // const response = await fetch("http://your-django-backend/api/users/", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: user.email,
        //     name: user.name,
        //     twitterId: user.id,
        //   }),
        // });
        //
        // if (response.ok) {
        //   return true;
        // }
        return true;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  });
};
