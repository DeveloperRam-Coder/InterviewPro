
import React from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

interface FeaturesSectionProps {
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
    customIndex: number;
  }>;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
          >
            <span>Powerful Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything you need for better interviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Our platform streamlines your entire interview process with powerful tools designed for every stakeholder.
          </motion.p>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              color={feature.color}
              customIndex={feature.customIndex}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
