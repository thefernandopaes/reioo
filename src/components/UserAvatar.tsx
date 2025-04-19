
import { useState, useEffect } from "react";

interface UserAvatarProps {
  avatar: string;
  username: string;
  speaking?: boolean;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ 
  avatar, 
  username, 
  speaking = false, 
  size = "md" 
}: UserAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(speaking);
  
  // Update animation state when speaking prop changes
  useEffect(() => {
    setIsAnimating(speaking);
  }, [speaking]);

  // Determine size classes
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-2xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`avatar ${isAnimating ? "speaking" : ""} ${sizeClasses[size]}`}
        title={username}
      >
        <span>{avatar}</span>
      </div>
      <div className="mt-2 text-xs text-reioo-purple truncate max-w-[80px]">
        {username}
      </div>
    </div>
  );
};

export default UserAvatar;
