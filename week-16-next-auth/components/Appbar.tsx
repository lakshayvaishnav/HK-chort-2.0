"use client";

import { signIn, signOut, useSession } from "next-auth/react";
export const Appbar = () => {
  const session = useSession();
  return (
    <>
      <button
        onClick={() => {
          signIn();
        }}
      >
        SignIn
      </button>
      <button onClick={() => signOut()}>SignOut</button>

      {JSON.stringify(session)}
    </>
  );
};
