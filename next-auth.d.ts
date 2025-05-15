// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the 'id' field
      // Twitter ID
      name?: string | null;
      email?: string | null;
      image?: string | null;
      encrypted?: string; // Add the 'encrypted' field
    };
  }

  interface User {
    id: string; 
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
