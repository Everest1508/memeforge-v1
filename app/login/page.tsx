// app/login/page.tsx
'use client';

import { signIn,signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn("twitter"); // This triggers the Twitter OAuth login
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    // User is logged in
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Welcome, {session.user?.name}</h2>
        <p className="text-lg">Email: {session.user?.email}</p>
        <img src={session.user?.image || "/default-avatar.png"} alt="User Avatar" className="w-20 h-20 rounded-full mt-4" />
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Log out
        </button>
      </div>
    );
  }

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
