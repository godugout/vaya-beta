
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, delay }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="border-b border-gray-200 dark:border-gray-700 py-5"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-xl font-heading font-medium text-gray-900 dark:text-white">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-autumn" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          <p className="text-gray-700 dark:text-gray-300">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How does Vaya's voice recording work?",
      answer: "Vaya uses advanced audio recording technology to capture high-quality voice recordings. Simply tap the microphone button and start speaking. Our system records your voice, transcribes it automatically, and stores it securely in your family account.",
    },
    {
      question: "Is Vaya accessible for elderly family members?",
      answer: "Yes! Vaya is designed with accessibility in mind. We offer larger controls, voice commands, and a simplified interface option specifically for elderly users. Our voice-first approach minimizes the need for complex screen interactions.",
    },
    {
      question: "How secure are my family stories?",
      answer: "Your family's privacy is our top priority. All stories are encrypted and stored securely. You control who can access your family content, and our Secret Family Vault feature provides additional layers of security for especially sensitive stories.",
    },
    {
      question: "What makes Vaya different from just recording videos?",
      answer: "Vaya combines voice recording with AI assistance to guide meaningful conversations, organization tools that connect stories to your family tree, and preservation features that ensure your stories remain accessible for generations. Our focus is on meaningful storytelling, not just media storage.",
    },
    {
      question: "How does the Wedding Event Mode work?",
      answer: "Wedding Event Mode creates a special digital space for your wedding where guests can easily contribute stories through QR codes on place cards. It includes proximity detection to find family members, real-time activity tracking, and gamification elements to encourage participation.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Everything you need to know about preserving your family's legacy with Vaya.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
