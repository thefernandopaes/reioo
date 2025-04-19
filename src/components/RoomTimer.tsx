
import { useState, useEffect } from "react";

interface RoomTimerProps {
  expiryTime: number; // Time in seconds
  onExpire?: () => void;
}

const RoomTimer = ({ expiryTime, onExpire }: RoomTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(expiryTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Visual indicator of time remaining
  const getTimeColor = () => {
    if (timeLeft < 300) return "text-reioo-red"; // Less than 5 minutes
    if (timeLeft < 900) return "text-yellow-500"; // Less than 15 minutes
    return "text-reioo-purple";
  };

  return (
    <div className="flex items-center">
      <div className={`font-mono ${getTimeColor()}`}>
        Sala expira em {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default RoomTimer;
