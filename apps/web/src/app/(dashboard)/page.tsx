"use client"; // This directive makes the component a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auctions");
  }, [router]);

  return null;
}
