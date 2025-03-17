import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "./AnimatedText";

interface HeroSectionProps {
  reduceMotion: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ reduceMotion }) => {
  const navigate = useNavigate();

  // Parallax effect for hero section (only the y-axis transform is used)
  const { scrollYProgress } = useScroll();
  const heroYTransform = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-1000 to-indigo-800 pt-32 pb-20"
      style={{
        y: reduceMotion ? 0 : heroYTransform,
        opacity: 1, // Always fully visible
      }}
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <motion.div
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
      <motion.div
        className="absolute -top-48 -right-48 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-indigo-100 bg-blue-500/20 rounded-full"
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Revolutionize Your Hiring Process</span>
            </motion.div>

            <AnimatedText
              text="Complete Interview Management Platform"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              highlightClass="text-blue-200"
              highlightWords={["Interview", "Management"]}
              reduceMotion={reduceMotion}
              delay={0.2}
            />

            <motion.p
              className="text-xl max-w-xl text-blue-100 mb-8"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Streamline your hiring process with our comprehensive interview
              management system that connects candidates, interviewers and
              administrators.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-md w-full sm:w-auto group"
                  onClick={() =>
                    navigate("/login", { state: { isRegistering: true } })
                  }
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 text-blue-500 w-full sm:w-auto rounded-xl shadow-lg transition duration-300 
               bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center mt-8 text-blue-100"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex -space-x-2 mr-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-blue-700 bg-blue-${i * 100 + 300}`}
                  ></motion.div>
                ))}
              </div>
              <div>
                <div className="font-medium">Trusted by 1000+ companies</div>
                <div className="text-sm opacity-80">
                  Join the leading hiring teams
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-blue-100">
              <div className="bg-blue-50 p-4 flex items-center border-b border-blue-100">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm text-center text-slate-600 flex-1">
                  InterviewPro Dashboard
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Upcoming Interviews
                    </h3>
                    <p className="text-sm text-gray-500">Today, July 15</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    3 Today
                  </Badge>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Johnson",
                      role: "Frontend Developer",
                      time: "10:00 AM",
                      status: "Confirmed",
                    },
                    {
                      name: "Sarah Williams",
                      role: "UX Designer",
                      time: "1:30 PM",
                      status: "Pending",
                    },
                    {
                      name: "Michael Chen",
                      role: "Product Manager",
                      time: "4:00 PM",
                      status: "Confirmed",
                    },
                  ].map((interview, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors flex justify-between items-center"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                      }}
                      initial={{ opacity: 1, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                          {interview.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {interview.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {interview.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {interview.time}
                        </div>
                        <Badge
                          className={
                            interview.status === "Confirmed"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          }
                        >
                          {interview.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -right-8 bottom-8 bg-white p-3 rounded-lg shadow-lg border border-blue-100 max-w-[200px]"
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div className="text-sm font-medium">Interview Completed</div>
              </div>
              <div className="text-xs text-gray-500">
                James Peterson has completed the technical assessment with a
                score of 92%
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-5 -bottom-5 bg-blue-600 p-3 rounded-lg shadow-lg max-w-[180px]"
              initial={{ opacity: 1, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <div className="text-white text-sm font-medium mb-2">
                Time Saved This Week
              </div>
              <div className="text-2xl font-bold text-white">12+ Hours</div>
              <div className="text-xs text-blue-200 mt-1">
                Compared to manual scheduling
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
