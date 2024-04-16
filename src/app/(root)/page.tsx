"use client"
import Image from "next/image";

import { useSession, signIn } from "next-auth/react";

export default  function Home() {
  const {data: session} = useSession();
  const signin = () => signIn
  console.log(session);
  return( session?  (
    <main className="">Hello world 2 </main>
  ) : (
    <button
      className="h-20 w-40 bg-black text-white"
      onClick={signIn}
    >Sign in</button>
  ))
}
