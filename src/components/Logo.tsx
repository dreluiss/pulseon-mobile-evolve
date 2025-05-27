import { Activity } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showIcon = true, className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <Activity 
          size={iconSizes[size]} 
          className="text-black dark:text-white"
        />
      )}
      <span className={`font-poppins font-bold ${sizeClasses[size]}`}>
        <span className="text-primary">Pulse</span>
        <span
          className="logo-on"
          style={{ color: '#B1126A' }}
        >
          On
        </span>
      </span>
    </div>
  );
};

export default Logo;
