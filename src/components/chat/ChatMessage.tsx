import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.role === "assistant" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          message.role === "assistant"
            ? "bg-vaya-chat-bg text-vaya-gray-800 border border-vaya-chat-border"
            : "bg-vaya-primary text-white"
        } animate-fadeIn shadow-sm`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;