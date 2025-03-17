
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: "blue" | "purple" | "green" | "orange" | "pink" | "indigo";
  customIndex?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  features,
  color,
  customIndex = 0,
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <motion.div 
      variants={cardVariants}
      custom={customIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-none shadow-soft hover:shadow-hover transition-all duration-300 h-full">
        <CardHeader className="pb-2">
          <motion.div 
            className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
          </motion.div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-600">
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};
