
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export const ChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <FloatingActionButton 
      onClick={onClick}
      className="bottom-6 left-6"
    >
      <MessageSquare className="h-6 w-6" />
    </FloatingActionButton>
  );
};

export const ScrollButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <FloatingActionButton 
      onClick={onClick}
      className="bottom-6 right-6"
    >
      <ChevronDown className="h-6 w-6" />
    </FloatingActionButton>
  );
};
