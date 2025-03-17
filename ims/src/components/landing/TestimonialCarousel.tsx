
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, UserCheck } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  color: string;
}

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      title: "HR Director",
      company: "TechCorp",
      content: "InterviewPro has transformed our hiring process. We've reduced our time-to-hire by 40% and improved the quality of our hires significantly.",
      rating: 5,
      avatar: "blue",
      color: "blue"
    },
    {
      name: "Michael Chen",
      title: "Lead Developer",
      company: "StartupX",
      content: "As an interviewer, I appreciate how easy it is to provide feedback and review candidate information. The interface is intuitive and saves me tons of time.",
      rating: 5,
      avatar: "green",
      color: "green"
    },
    {
      name: "Emily Rodriguez",
      title: "Recent Hire",
      company: "Global Co.",
      content: "As a candidate, I loved how organized my interview process was. I received timely notifications and clear instructions every step of the way.",
      rating: 5,
      avatar: "purple",
      color: "purple"
    },
    {
      name: "David Thompson",
      title: "Recruiting Manager",
      company: "Enterprise Inc.",
      content: "The analytics and reporting features have given us insights we never had before. We can now make data-driven decisions about our hiring process.",
      rating: 5,
      avatar: "orange",
      color: "orange"
    }
  ];
  
  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };
  
  const colorClasses = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100"
  };
  
  const colorTextClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600"
  };

  return (
    <div className="relative">
      <div className="px-4 md:px-12 lg:px-24">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="bg-white shadow-soft border-none md:px-8 py-4">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr,3fr] gap-8">
                  <div className="flex items-center justify-center">
                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${colorClasses[testimonials[currentIndex].color]} flex items-center justify-center`}>
                      <UserCheck className={`h-8 w-8 md:h-12 md:w-12 ${colorTextClasses[testimonials[currentIndex].color]}`} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                        <p className="text-gray-600">{testimonials[currentIndex].title}, {testimonials[currentIndex].company}</p>
                      </div>
                    </div>
                    
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-700 italic">"{testimonials[currentIndex].content}"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center mt-8 gap-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prev}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={next}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
