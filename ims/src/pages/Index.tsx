import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScroll, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Users,
  BarChart2,
  Briefcase,
  Database,
  Shield,
  Layers,
  Brain,
  Clock,
  DollarSign,
  Target,
  Gauge,
  Handshake,
  FileCheck2,
  Megaphone,
  PieChart,
  BriefcaseBusiness,
  Globe,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { NavigationBar } from "@/components/landing/NavigationBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { ChatDialog } from "@/components/landing/ChatDialog";
import { ChatButton, ScrollButton } from "@/components/ui/floating-action-buttons";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // References to sections for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  
  // Animation controls
  const controlsFeatures = useAnimation();
  const controlsBenefits = useAnimation();
  
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();

  // Handle scroll for sticky navbar effect and animation triggers
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Check if features are in view
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          controlsFeatures.start("visible");
        }
      }
      
      // Check if benefits are in view
      if (benefitsRef.current) {
        const rect = benefitsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          controlsBenefits.start("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = () => {
      setReduceMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [scrolled, controlsFeatures, controlsBenefits]);

  // If already authenticated, redirect to the appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "candidate":
          navigate("/candidate/dashboard");
          break;
        case "interviewer":
          navigate("/interviewer/dashboard");
          break;
        default:
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

  const scrollToSection = (refKey: string) => {
    const refMap = {
      features: featuresRef,
      benefits: benefitsRef,
      pricing: pricingRef,
      testimonials: testimonialsRef,
      newsletter: newsletterRef,
    };
    refMap[refKey as keyof typeof refMap]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Features data
  const extendedFeatures = [
    {
      icon: <Calendar />,
      title: "Smart Scheduling",
      description: "AI-powered interview scheduling that works for everyone",
      features: [
        "Calendar integration with Google, Outlook & iCal",
        "Automated timezone detection & adjustment",
        "Conflict resolution & smart suggestions",
        "Customizable availability templates"
      ],
      color: "blue" as const,
      customIndex: 0,
    },
    {
      icon: <User />,
      title: "Candidate Management",
      description: "Comprehensive candidate tracking system",
      features: [
        "Unified candidate profiles with history",
        "Document management & version control",
        "Stage tracking with visual pipeline",
        "Custom fields & data organization"
      ],
      color: "purple" as const,
      customIndex: 1,
    },
    {
      icon: <Users />,
      title: "Team Collaboration",
      description: "Seamless teamwork for better hiring decisions",
      features: [
        "Real-time collaboration on evaluations",
        "Role-based permissions & access control",
        "Comment threads & @mentions",
        "Decision-making tools & consensus tracking"
      ],
      color: "green" as const,
      customIndex: 2,
    },
    {
      icon: <Briefcase />,
      title: "Feedback System",
      description: "Structured feedback collection and analysis",
      features: [
        "Customizable scorecards & evaluation forms",
        "Comparative candidate analysis",
        "Bias detection & fair hiring tools",
        "Historical performance metrics"
      ],
      color: "orange" as const,
      customIndex: 3,
    },
    {
      icon: <BarChart2 />,
      title: "Advanced Analytics",
      description: "Data-driven insights for hiring optimization",
      features: [
        "Custom dashboards & reporting",
        "Hiring funnel visualization & metrics",
        "Interviewer performance analytics",
        "Prediction models for time-to-hire"
      ],
      color: "pink" as const,
      customIndex: 4,
    },
    {
      icon: <Database />,
      title: "Talent Pool",
      description: "Build your pipeline of future employees",
      features: [
        "AI-powered candidate matching",
        "Automated talent nurturing campaigns",
        "Skills database & competency mapping",
        "Talent rediscovery algorithms"
      ],
      color: "indigo" as const,
      customIndex: 5,
    },
    {
      icon: <Shield />,
      title: "Compliance & Security",
      description: "Enterprise-grade security and compliance",
      features: [
        "GDPR, CCPA & global compliance tools",
        "Data retention policies & enforcement",
        "Audit logs & compliance reporting",
        "SOC 2 Type II & ISO 27001 certified"
      ],
      color: "blue" as const,
      customIndex: 6,
    },
    {
      icon: <Layers />,
      title: "Seamless Integration",
      description: "Connect with your existing tech stack",
      features: [
        "Native integrations with 50+ ATS/HRIS systems",
        "Open API for custom integrations",
        "Zapier, Make & workflow automation",
        "SSO & identity management"
      ],
      color: "green" as const,
      customIndex: 7,
    },
    {
      icon: <Brain />,
      title: "AI Assistant",
      description: "Intelligent support throughout your hiring process",
      features: [
        "Interview question suggestions",
        "Automated interview summaries",
        "Candidate engagement predictions",
        "Smart follow-up recommendations"
      ],
      color: "purple" as const,
      customIndex: 8,
    }
  ];

  // Benefits data
  const enhancedBenefits = [
    { 
      icon: <Clock className="h-12 w-12 text-blue-500" />, 
      title: "Save 70% of Time", 
      description: "Reduce time-to-hire by up to 70% with intelligent automation and streamlined workflows that eliminate repetitive tasks",
      delay: 0
    },
    { 
      icon: <DollarSign className="h-12 w-12 text-green-500" />, 
      title: "Cut Hiring Costs by 35%", 
      description: "Lower recruitment costs significantly by optimizing your interview process, reducing no-shows, and improving team efficiency",
      delay: 0.1
    },
    { 
      icon: <Target className="h-12 w-12 text-purple-500" />, 
      title: "Hire Better Candidates", 
      description: "Improve candidate quality with structured interviews, bias reduction tools, and data-driven evaluation frameworks",
      delay: 0.2
    },
    { 
      icon: <Gauge className="h-12 w-12 text-orange-500" />, 
      title: "10x Team Efficiency", 
      description: "Streamline your entire hiring process with powerful automation and deep integrations with your existing tools",
      delay: 0.3
    },
    { 
      icon: <Handshake className="h-12 w-12 text-indigo-500" />, 
      title: "Improve Candidate Experience", 
      description: "Create a seamless, professional experience for candidates with branded portals, timely communications, and transparent processes",
      delay: 0.4
    },
    { 
      icon: <FileCheck2 className="h-12 w-12 text-pink-500" />, 
      title: "Ensure Compliance", 
      description: "Stay compliant with global regulations using built-in tools for data handling, consent management, and audit-ready reporting",
      delay: 0.5
    },
    { 
      icon: <Megaphone className="h-12 w-12 text-blue-500" />, 
      title: "Strengthen Your Brand", 
      description: "Enhance your employer brand with consistent, professional communications and a modern candidate experience that reflects your values",
      delay: 0.6
    },
    { 
      icon: <PieChart className="h-12 w-12 text-green-500" />, 
      title: "Data-Driven Decisions", 
      description: "Make better hiring decisions using comprehensive analytics, performance insights, and predictive hiring models",
      delay: 0.7
    }
  ];
  
  // Pricing options
  const pricingPlans = [
    {
      title: "Starter",
      price: 49,
      description: "Perfect for small teams just getting started",
      features: [
        "Up to 10 interviews per month",
        "Basic analytics",
        "Email support",
        "1 admin user"
      ],
      cta: "Get Started",
      highlight: false,
      color: "blue" as const
    },
    {
      title: "Professional",
      price: 99,
      description: "Everything you need for growing companies",
      features: [
        "Unlimited interviews",
        "Advanced analytics & reporting",
        "Priority support",
        "5 admin users",
        "Custom branding"
      ],
      cta: "Try Professional",
      highlight: true,
      color: "green" as const
    },
    {
      title: "Enterprise",
      price: 299,
      description: "For large organizations with complex hiring needs",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "24/7 phone & email support",
        "Unlimited admin users",
        "Custom integrations",
        "SSO & advanced security"
      ],
      cta: "Contact Sales",
      highlight: false,
      color: "purple" as const
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <NavigationBar 
        scrolled={scrolled} 
        scrollToSection={scrollToSection}
        extendedFeatures={extendedFeatures}
      />
      
      <HeroSection reduceMotion={reduceMotion} />
      
      <div ref={featuresRef}>
        <FeaturesSection features={extendedFeatures} />
      </div>
      
      <div ref={benefitsRef}>
        <BenefitsSection benefits={enhancedBenefits} />
      </div>
      
      <div ref={testimonialsRef}>
        <TestimonialCarousel />
      </div>
      
      <div ref={pricingRef}>
        <PricingSection pricingPlans={pricingPlans} />
      </div>
      
      <div ref={newsletterRef}>
        <NewsletterSection />
      </div>

      {/* Floating action buttons */}
      <ScrollButton onClick={() => scrollToSection('features')} />
      <ChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chat Dialog */}
      <ChatDialog 
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
      />
    </div>
  );
};

export default Index;
