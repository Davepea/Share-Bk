// app/components/SessionButton.tsx
"use client";  // Make this a Client Component


import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

const SessionButton = ({ session }: { session: Session | null}) => {
  if (session) {
    return (
      <>
        <p className="text-sm text-black">Welcome, {session.user?.name}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sign In
    </button>
  );
};

export default SessionButton;
