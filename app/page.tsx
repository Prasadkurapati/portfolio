"use client";

import { useState, useEffect, useRef } from "react";
import InteractiveCard from "../components/InteractiveCard";
import TypingAnimation from "../components/TypingAnimation";
import Footer from "../components/Footer";

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
        response =
          "👋 Hello, I'm Durga Prasad Kurapati!\n\n" +
          "I'm a Data Scientist and AI Researcher committed to building practical, intelligent systems that create real-world impact.\n\n" +
          "Background:\n" +
          "- Currently pursuing a Master’s in Data Science at Rowan University\n" +
          "- Independently developed projects like VoiceCheck AI, SmokeScanAI, and MedLens — tackling audio forensics, radiology, and X-ray diagnostics\n" +
          "- Focused on deep learning, NLP, and computer vision — with a passion for explainability and medical AI\n" +
          "- Skilled in Python, PyTorch, TensorFlow, React, and end-to-end ML deployment\n" +
          "- I treat every personal project like a production system — testing, iterating, and building with real-world use in mind\n\n" +
          "While I may not have corporate experience yet, I’ve built a strong foundation through rigorous self-learning, hands-on experimentation, and solo research.\n\n" +
          "Type 'projects', 'skills', or 'contact' to explore more!";
        break;

      case "projects":
        response =
          "🚀 Some of my standout projects:\n\n" +
          "• VoiceCheck AI – Real vs Fake Audio Detection\n" +
          "• MedLens – AI-assisted Radiology + Clinical NLP\n" +
          "• SmokeScanAI – Lung X-ray Classification\n" +
          "• NeuroEnhance – Deep Learning Image Enhancement\n" +
          "• Blockchain Simulator – Fully Custom Python Blockchain\n\n" +
          "Type 'skills' or 'contact' to explore more!";
        break;

      case "skills":
        response =
          "🛠️ Technical Skills:\n\n" +
          "• Languages: Python, JavaScript, SQL\n" +
          "• Libraries: PyTorch, TensorFlow, scikit-learn\n" +
          "• Web: React, Next.js, Flask, Streamlit\n" +
          "• Tools: Git, Docker, Google Colab, VS Code\n" +
          "• Specialties: Deep Learning, NLP, Vision, Blockchain\n\n" +
          "Type 'projects' or 'experience' to see more!";
        break;

      case "experience":
        response =
          "💼 Experience:\n\n" +
          "• Graduate Data Science Student @ Rowan University\n" +
          "• Self-driven research in AI signal generation, audio forensics, and medical imaging\n" +
          "• Independently built systems like VoiceCheck, SmokeScanAI, and RentManager — treating each with a production-grade mindset\n\n" +
          "I've honed my skills by building from scratch, debugging real challenges, and turning ideas into deployable systems.";
        break;

      case "contact":
        response =
          "📬 Let's connect!\n\n" +
          "• Email   : kurapatis1999@gmail.com\n" +
          "• GitHub  : github.com/Prasadkurapati\n" +
          "• LinkedIn: linkedin.com/in/kurapatidurgaprasad\n\n" +
          "Feel free to reach out for collaboration, projects, or just to say hi!";
        break;

      case "education":
        response =
          "🎓 Education:\n\n" +
          "• M.S. in Data Science (Expected 2025)\n" +
          "  Rowan University, New Jersey, USA\n\n" +
          "• B.C.A. (Bachelor of Computer Applications)\n" +
          "  India";
        break;

      case "certifications":
        response =
          "🎓 Certifications:\n\n" +
          "• Deep Learning Specialization (Coursera)\n" +
          "• Python for Data Science (IBM)\n" +
          "• Full-Stack Developer Nanodegree (Udacity)";
        break;

      case "leadership":
        response =
          "🧠 Leadership & Initiative:\n\n" +
          "• Initiated and led multiple independent AI projects\n" +
          "• Designed self-directed research like VoiceCheck AI, SmokeScanAI, and MedLens\n" +
          "• Continuously built, tested, and improved real-world solutions from scratch\n" +
          "• Shared work publicly to inspire and help others through GitHub\n\n" +
          "Leadership isn’t about titles — it’s about taking action, staying consistent, and creating value.";
        break;

      case "sudo":
        response =
          "🔒 Permission denied.\n\n" +
          "This isn't a real terminal — but nice try, hacker 😄\n" +
          "If you really want root access to my brain, start with 'about' or 'projects'.";
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
