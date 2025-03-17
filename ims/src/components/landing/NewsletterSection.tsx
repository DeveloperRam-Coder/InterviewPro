
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MailIcon, SendIcon, CheckCircle } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
            
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <MailIcon size={14} />
                    <span>Stay Updated</span>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Subscribe to our newsletter
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Get the latest news, updates, and insights on interview techniques, hiring trends, and exclusive tips directly to your inbox.
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {isSubscribed ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600">You've been successfully subscribed to our newsletter.</p>
                      <Button 
                        className="mt-4"
                        variant="outline"
                        onClick={() => setIsSubscribed(false)}
                      >
                        Subscribe another email
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white pr-12 h-12 text-base"
                          required
                        />
                        <div className="absolute right-2 top-2.5 text-gray-400">
                          <MailIcon size={20} />
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>Processing<span className="ml-2 animate-pulse">...</span></>
                          ) : (
                            <>Subscribe <SendIcon className="ml-2 h-4 w-4" /></>
                          )}
                        </Button>
                      </motion.div>
                      <p className="text-xs text-gray-500 mt-2">
                        By subscribing, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  )}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
