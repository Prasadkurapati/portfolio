"use client";

import { useState, useEffect, useRef } from "react";
import InteractiveCard from "../components/InteractiveCard";
import TypingAnimation from "../components/TypingAnimation";
import Footer from "../components/Footer";
import { PortfolioData } from "../lib/portfolio";

const commands = [
  { command: "about", description: "Learn about me" },
  { command: "projects", description: "View my projects" },
  { command: "skills", description: "See my technical skills" },
  { command: "experience", description: "My work experience" },
  { command: "contact", description: "How to reach me" },
  { command: "education", description: "My educational background" },
  { command: "certifications", description: "View my certifications" },
  {
    command: "leadership",
    description: "Leadership and community involvement",
  },
  { command: "clear", description: "Clear the terminal" },
  { command: "sudo", description: "Try it 😉" },
  { command: "help", description: "List available commands" },
];

interface CommandHistory {
  command: string;
  response: string;
  timestamp: Date;
}

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      response:
        "Hi, I'm Durga Prasad Kurapati, a Data Scientist & AI Researcher.\n\nWelcome to my interactive AI-powered portfolio terminal!\nType 'help' to see available commands.",
      timestamp: new Date(),
    },
  ]);

  const [currentCommand, setCurrentCommand] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, [currentCommand]);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    focusInput();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  const resetTabCompletion = () => {
    setTabMatches([]);
    setTabIndex(-1);
  };

  const showAllMatches = () => {
    const input = currentCommand.toLowerCase();
    const matches = commands
      .filter((c) => c.command.startsWith(input))
      .map((c) => c.command);

    if (matches.length > 1) {
      setCommandHistory((prev) => [
        ...prev,
        {
          command: currentCommand,
          response: matches.join("    "),
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleTabComplete = () => {
    const input = currentCommand.toLowerCase();

    if (tabIndex === -1) {
      showAllMatches();
      const newMatches = commands
        .filter((c) => c.command.startsWith(input))
        .map((c) => c.command);

      if (newMatches.length === 0) return;

      setTabMatches(newMatches);

      if (newMatches.length === 1) {
        setCurrentCommand(newMatches[0]);
        resetTabCompletion();
      } else {
        setTabIndex(0);
        setCurrentCommand(newMatches[0]);
      }
    } else {
      const newIndex = (tabIndex + 1) % tabMatches.length;
      setTabIndex(newIndex);
      setCurrentCommand(tabMatches[newIndex]);
    }
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let response = "";

    switch (command) {
      case "help":
        response =
          "Available commands:\n" +
          commands
            .map((c) => `${c.command.padEnd(14)}- ${c.description}`)
            .join("\n");
        break;

      case "about":
        response = PortfolioData.about.response;
        break;

      case "projects":
        response = PortfolioData.projects.response;
        break;

      case "skills":
        response = PortfolioData.skills.response;
        break;

      case "experience":
        response = PortfolioData.experience.response;
        break;

      case "contact":
        response = PortfolioData.contact.response;
        break;

      case "education":
        response = PortfolioData.education.response;
        break;

      case "certifications":
        response = PortfolioData.certifications.response;
        break;

      case "leadership":
        response = PortfolioData.leadership.response;
        break;

      case "sudo":
        response = PortfolioData.sudo.response;
        break;

      case "clear":
        setCommandHistory([]);
        return;
      case "":
        return;

      default:
        if (/skills?/i.test(command) || /what.*you.*know/i.test(command)) {
          response =
            "Technical Skills:\n\n• Languages: Python, JavaScript, SQL\n• Libraries: PyTorch, TensorFlow, scikit-learn\n• Web: React, Next.js, Flask, Streamlit\n• Tools: Git, Docker, Google Colab, VS Code\n• Specialties: Deep Learning, NLP, Vision, Blockchain";
        } else if (
          /project/i.test(command) ||
          /what.*you.*work/i.test(command)
        ) {
          response =
            "Some of my standout projects:\n\n• VoiceCheck AI – Real vs Fake Audio Detection\n• MedLens – AI-assisted Radiology + Clinical NLP\n• SmokeScanAI – Lung X-ray Classification\n• NeuroEnhance – Deep Learning Image Enhancement\n• Blockchain Simulator – Fully Custom Python Blockchain";
        } else if (/contact/i.test(command) || /how.*reach/i.test(command)) {
          response =
            "Let's connect!\n\n• Email: kurapatis1999@gmail.com\n• GitHub: https://github.com/Prasadkurapati\n• LinkedIn: https://www.linkedin.com/in/kurapatidurgaprasad/";
        } else if (
          /who.*are.*you/i.test(command) ||
          /about.*you/i.test(command)
        ) {
          response =
            "I'm Durga Prasad Kurapati, a Data Science master's student with a passion for AI, deep learning, and building real-world impactful projects. My focus is on deploying intelligent systems, solving hard problems, and contributing meaningful work.";
        } else {
          response = `Command not found: ${command}\nType 'help' to see available commands.`;
        }
        break;
    }

    setCommandHistory((prev) => [
      ...prev,
      {
        command: cmd,
        response,
        timestamp: new Date(),
      },
    ]);
    resetTabCompletion();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabComplete();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
    resetTabCompletion();
  };

  const formatTime = (date: Date) =>
    date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white overflow-hidden">
      <header className="p-4 border-b border-green-700 text-center md:text-left">
        <h1 className="text-2xl font-bold text-green-500 font-mono">
          Durga Prasad Kurapati
        </h1>
        <p className="text-sm text-gray-400 font-mono">
          Data Scientist & AI Researcher
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden flex-row">
        <div className="hidden md:block w-[65%] h-full border-green-700 border-r relative z-10">
          <div className="relative w-full h-full">
            <InteractiveCard />
            <div className="absolute bottom-2 right-2 text-xs text-green-500 font-mono bg-black bg-opacity-70 p-1 rounded z-20">
              [Interactive 3D Card]
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full overflow-auto relative">
          <div
            ref={terminalRef}
            className="terminal-container w-full h-full bg-black text-green-500 font-mono pb-6 overflow-y-auto"
          >
            <div className="available-commands py-4 text-sm border-b border-green-700 px-4 pb-2 md:fixed bg-black z-10 hidden md:block w-full">
              {commands.map((c) => `${c.command.padEnd(14)} `).join(" | ")}
            </div>

            <div className="command-history md:pt-16 pt-2 px-4">
              {commandHistory.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="mb-4">
                  <div className="command-line flex items-center">
                    <span className="text-blue-400 mr-2">
                      durga@portfolio:~$
                    </span>
                    <span>{entry.command}</span>
                  </div>

                  {entry.command === "welcome" && (
                    <pre className="whitespace-pre-wrap text-white font-mono typingAnimation">
                      {entry.response ? entry.response : ""}
                    </pre>
                  )}

                  {entry.command !== "welcome" && (
                    <TypingAnimation
                      text={entry.response}
                      onFinish={
                        index === commandHistory.length - 1
                          ? () => {
                              setTimeout(() => {
                                terminalRef.current?.scrollTo({
                                  top: terminalRef.current.scrollHeight,
                                  behavior: "smooth",
                                });
                              }, 10);
                            }
                          : undefined
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="command-input flex items-center mt-4 px-4"
            >
              <span className="text-blue-400 mr-2">durga@portfolio:~$</span>
              <div className="fake-input flex-1 relative font-mono text-green-500">
                <span className="whitespace-pre-wrap break-words border-dotted border-green-500">
                  {currentCommand}
                </span>
                <span className="cursor" />

                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-transparent outline-none"
                  spellCheck={false}
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
