"use client"
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
// create async component - async component works only in nextjs. ! only server components can do this.
export default () => {
  
  const router = useRouter();
  return (
    <div>
      hello !
      <button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
};
