"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signature/billing");
      router.refresh();
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
