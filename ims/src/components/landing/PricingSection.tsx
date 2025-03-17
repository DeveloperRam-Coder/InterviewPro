
import React from "react";
import { motion } from "framer-motion";
import { PricingCard } from "./PricingCard";

interface PricingPlan {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
}

export const PricingSection: React.FC<PricingSectionProps> = ({ pricingPlans }) => {
  return (
    <div className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
          >
            <span>Simple Pricing</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Plans for teams of all sizes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                highlight={plan.highlight}
                color={plan.color}
                customIndex={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
