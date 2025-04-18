
import { Mic, FileText, Image } from "lucide-react";

export const memoryTypes = [
  {
    id: "voice",
    name: "Voice Memory",
    description: "Record audio memories and stories",
    icon: Mic,
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    iconClass: "text-white",
  },
  {
    id: "text",
    name: "Text Memory",
    description: "Write down your thoughts",
    icon: FileText,
    color: "bg-gradient-to-r from-blue-500 to-cyan-600",
    iconClass: "text-white",
  },
  {
    id: "photo",
    name: "Photo Memory",
    description: "Share photos with captions",
    icon: Image,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    iconClass: "text-white",
  }
] as const;
