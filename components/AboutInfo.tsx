'use client'; 

import React, { useState } from 'react';
import { Truck, RotateCw, Tag, LifeBuoy, ArrowRight } from 'lucide-react';

// **********************************************
// 1. Feature Item Component (Used in Server Component)
// **********************************************
interface FeatureItemProps {
  icon: React.ElementType; // Lucide icon
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <Icon className="w-6 h-6 text-gray-800 mb-2" />
    <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </div>
);

// **********************************************
// 2. Features Section (Server Component Structure)
// **********************************************
const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'orders $50 or more',
    },
    {
      icon: RotateCw,
      title: 'Free Returns',
      description: 'within 30 days',
    },
    {
      icon: Tag,
      title: 'Get 20% Off 1 Item',
      description: 'when you sign up',
    },
    {
      icon: LifeBuoy,
      title: 'We Support',
      description: '24/7 amazing services',
    },
  ];

  return (
    <div className="bg-gray-100 py-6 border-b border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

// **********************************************
// 3. Newsletter Section (Client Component)
// **********************************************
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      console.log('Subscribing email:', email);
      alert(`Thank you for subscribing! We will send updates to ${email}`);
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div 
      className="relative bg-cover bg-center h-80 flex items-center justify-center p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')" }} // আপনার পাবলিক ফোল্ডারে এই ইমেজটি রাখুন
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div> 
      
      {/* Content */}
      <div className="relative z-10 text-white text-center">
        <h3 className="text-3xl font-bold mb-2">Get The Latest Deals</h3>
        <p className="text-lg font-light mb-6">
          and receive $20 coupon for first shopping
        </p>
        
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="flex w-full max-w-lg bg-white rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 p-3 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center bg-transparent border-l border-gray-300 px-4 text-gray-800 font-semibold hover:bg-gray-50 transition duration-200"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// **********************************************
// 4. মূল এক্সপোর্ট কম্পোনেন্ট
// **********************************************
const AboutInfo: React.FC = () => {
    return (
        <footer className="w-full">
            {/* Features Section */}
            <FeatureSection />
            
            {/* Newsletter/Deal Section */}
            <NewsletterSection />
        </footer>
    );
};

export default AboutInfo;