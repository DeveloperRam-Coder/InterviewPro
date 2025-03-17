
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button 
          variant="ghost" 
          className="mb-8 flex items-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About InterviewPro</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              InterviewPro is the leading interview management platform designed to streamline the entire hiring process for companies of all sizes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to transform the hiring experience by providing a comprehensive platform that connects candidates, interviewers, and hiring managers in one seamless ecosystem.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2020, InterviewPro was born out of frustration with fragmented hiring processes. Our founders, experienced hiring managers themselves, set out to build a solution that would address the pain points they experienced firsthand.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Today, InterviewPro serves thousands of companies worldwide, helping them make better hiring decisions faster while providing a superior candidate experience.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-lg text-gray-600 mb-6 space-y-2">
              <li><strong>Transparency:</strong> We believe in open communication throughout the hiring process.</li>
              <li><strong>Efficiency:</strong> We're committed to saving time for everyone involved in hiring.</li>
              <li><strong>Fairness:</strong> We design our platform to reduce bias and promote equitable hiring practices.</li>
              <li><strong>Innovation:</strong> We continuously improve our platform based on user feedback and industry trends.</li>
              <li><strong>Privacy:</strong> We prioritize data security and comply with global privacy standards.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-6">
              Have questions about InterviewPro? We'd love to hear from you!
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Email: info@interviewpro.com<br />
              Phone: +1 (555) 123-4567
            </p>
            
            <div className="mt-10">
              <Button 
                size="lg" 
                className="mr-4"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
