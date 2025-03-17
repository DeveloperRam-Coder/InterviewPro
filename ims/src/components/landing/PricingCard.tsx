
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  customIndex?: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  cta,
  highlight = false,
  color = "blue",
  customIndex = 0,
}) => {
  const navigate = useNavigate();
  
  // Define color classes based on the color prop
  const colorMap = {
    blue: {
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      badge: "bg-blue-100 text-blue-700",
      border: "border-blue-400",
    },
    green: {
      button: "bg-green-600 hover:bg-green-700 text-white",
      badge: "bg-green-100 text-green-700",
      border: "border-green-400",
    },
    purple: {
      button: "bg-purple-600 hover:bg-purple-700 text-white",
      badge: "bg-purple-100 text-purple-700",
      border: "border-purple-400",
    },
    orange: {
      button: "bg-orange-600 hover:bg-orange-700 text-white",
      badge: "bg-orange-100 text-orange-700",
      border: "border-orange-400",
    },
    pink: {
      button: "bg-pink-600 hover:bg-pink-700 text-white",
      badge: "bg-pink-100 text-pink-700",
      border: "border-pink-400",
    },
    indigo: {
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      badge: "bg-indigo-100 text-indigo-700",
      border: "border-indigo-400",
    },
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
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`h-full transition-all duration-300 ${highlight ? `border-2 ${colorMap[color].border} shadow-xl` : "border-transparent shadow-soft"}`}>
        <CardHeader className="pb-2">
          {highlight && (
            <Badge className={`mb-2 ${colorMap[color].badge}`}>Popular Choice</Badge>
          )}
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="mt-2 mb-1">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-gray-500 ml-1">/month</span>
          </div>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-600">
          <ul className="space-y-3 mt-4">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <motion.div 
            className="w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className={`w-full ${colorMap[color].button}`}
              onClick={() => navigate("/login", { state: { isRegistering: true } })}
            >
              {cta}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
