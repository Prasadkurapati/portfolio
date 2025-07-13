// lib/utils.ts

export const availableCommands = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "education",
  "certifications",
  "leadership",
  "sudo",
  "clear"
];

export function getResponse(command: string): string {
  switch (command) {
    case "help":
      return "Available commands:\n" + availableCommands.join(" | ");
    case "about":
      return "I'm Durga Prasad, a passionate Software & AI Engineer with expertise in full-stack development, machine learning, and cloud technologies. I love building innovative solutions that make a difference.";
    case "projects":
      return `Here are some of my notable projects:\n\n• VoiceCheck AI - Real vs Fake Voice Detector\n• SmokeScan AI - Smoker vs Non-Smoker Lung X-Ray Classifier\n• MedLens - AI Diagnosis from Radiology + Clinical Notes\n• WildfireWatch - Real-Time Fire Detection with Sensor Fusion`;
    case "skills":
      return `Technical Skills:\n\n• Languages: Python, JavaScript, TypeScript, Go\n• Frontend: React, Next.js, Tailwind CSS\n• Backend: Node.js, Django, FastAPI\n• Cloud: AWS, GCP, Azure\n• Database: PostgreSQL, MongoDB, Redis\n• AI/ML: PyTorch, TensorFlow, Scikit-learn\n• DevOps: Docker, GitHub Actions, CI/CD`;
    case "experience":
      return `Professional Experience:\n\n• AI Engineer Intern - Healthcare Startup (2024)\n  - Built diagnosis models on radiology reports\n  - Deployed streamlit apps on HuggingFace\n\n• Research Assistant - Signal Generation (2023)\n  - Worked with VQ-VAE and Transformers\n  - Published results in local academic symposium`;
    case "contact":
      return `Let's connect!\n\n• Email: durga@example.com\n• LinkedIn: linkedin.com/in/durgaprasad\n• GitHub: github.com/durgaprasad\n• Twitter: @durga_ai`;
    case "education":
      return `Education:\n\n• Master's in Data Science\n  Rowan University (2024 - Present)\n\n• Bachelor's in Computer Science\n  JNTU Hyderabad (2020 - 2023)`;
    case "certifications":
      return `Certifications:\n\n• TensorFlow Developer Certificate\n• AWS Certified Cloud Practitioner\n• Google Cloud Fundamentals\n• DeepLearning.AI NLP Specialization`;
    case "leadership":
      return `Leadership Experience:\n\n• Led Capstone AI project with 4-member team\n• Organized 3 local coding workshops\n• Volunteered as Teaching Assistant for Python\n• Built and maintained 5+ open-source projects`;
    case "sudo":
      return "Nice try! But this is a portfolio, not a real terminal. 😄\nTry 'help' to see what you can actually do here.";
    default:
      return `Command not found: ${command}\nType 'help' to see available commands.`;
  }
}

export function formatTime(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
}
