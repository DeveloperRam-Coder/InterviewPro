
import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightClass?: string;
  highlightWords?: string[];
  reduceMotion?: boolean;
  delay?: number;
  charDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  highlightClass = "",
  highlightWords = [],
  reduceMotion = false,
  delay = 0,
  charDelay = 0.04,
}) => {
  // Split text into words
  const words = text.split(" ");
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: charDelay * i + delay,
      },
    }),
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  if (reduceMotion) {
    return (
      <h1 className={className}>
        {words.map((word, i) => (
          <span 
            key={i} 
            className={highlightWords.includes(word) ? highlightClass : ""}
          >
            {word}{" "}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-1">
          <motion.span
            className={highlightWords.includes(word) ? highlightClass : ""}
            variants={child}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};
