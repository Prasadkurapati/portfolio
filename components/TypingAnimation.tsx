"use client";

import { useEffect, useState } from "react";
import { computeSkinning } from "three/tsl";

interface TypingAnimationProps {
  text: string;
  speed?: number; // milliseconds per character
  onFinish?: () => void;
}

export default function TypingAnimation({
  text,
  speed = 20,
  onFinish,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");

  const listOfCharacters = text.split("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < listOfCharacters.length) {
        const nextChar = listOfCharacters[currentIndex]; //h

        if (nextChar !== undefined) {
          setDisplayedText((prev) => prev + nextChar);
        }

        onFinish?.();

        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [text, speed]);

  return (
    <pre className="whitespace-pre-wrap text-white font-mono typingAnimation">
      {text ? displayedText : ""}
    </pre>
  );
}
