'use client';

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ensure only your styles apply after hydration
    document.body.className = "antialiased";
  }, []);

  return <div className="antialiased">{children}</div>;
}
