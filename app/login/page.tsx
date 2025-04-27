// app/login/page.tsx
'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("twitter"); // This triggers the Twitter OAuth login
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Log in with Twitter
      </button>
    </div>
  );
}
