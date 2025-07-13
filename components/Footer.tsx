"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date()); // Set initial time after mount
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="p-2 border-t border-green-700 flex justify-between text-xs text-green-500 font-mono">
      <span>durga@portfolio:~$</span>
      <span suppressHydrationWarning>
        {time ? time.toLocaleString() : ""}
      </span>
    </footer>
  );
}
