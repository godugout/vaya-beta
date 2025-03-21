
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageScriptPicker = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    if (value === "en" || value === "es" || value === "gu" || value === "hi") {
      setLanguage(value);
    }
  };

  return (
    <div className="language-picker-container">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px] bg-purple-600/40 backdrop-blur-sm border-purple-300/30 text-white">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-purple-900/80 backdrop-blur-md border-purple-500/50 text-white">
          <SelectItem value="en" className="text-white hover:bg-purple-700/50">English</SelectItem>
          <SelectItem value="es" className="text-white hover:bg-purple-700/50">Español</SelectItem>
          <SelectItem value="gu" className="text-white hover:bg-purple-700/50">ગુજરાતી (Gujarati)</SelectItem>
          <SelectItem value="hi" className="text-white hover:bg-purple-700/50">हिंदी (Hindi)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
