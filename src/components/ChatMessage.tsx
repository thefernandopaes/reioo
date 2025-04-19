
import { useState, useEffect } from "react";

interface ChatMessageProps {
  avatar: string;
  username: string;
  message: string;
  timestamp?: number;
}

const ChatMessage = ({ avatar, username, message, timestamp }: ChatMessageProps) => {
  const [isFading, setIsFading] = useState(false);

  // Optional: Add a fade-in effect when the message appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 30000); // Start fading after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  // Format timestamp if provided
  const formattedTime = timestamp 
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : '';

  return (
    <div className={`chat-message ${isFading ? 'opacity-50' : ''} transition-opacity duration-5000`}>
      <div className="flex items-center">
        <span className="text-reioo-purple mr-2">{avatar}</span>
        <span className="text-reioo-purple font-bold">{username}</span>
        {timestamp && <span className="text-reioo-gray text-xs ml-2">{formattedTime}</span>}
      </div>
      <div className="ml-6 mt-1">{message}</div>
    </div>
  );
};

export default ChatMessage;
