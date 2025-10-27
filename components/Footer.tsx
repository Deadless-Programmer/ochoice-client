"use client";

import React from 'react';
import Link from 'next/link';

import { ChevronUp } from 'lucide-react'; // 'Scroll to Top' আইকনের জন্য

// **********************************************
// 1. ফুটারের লিংক ডেটা (TypeScript Interface)
// **********************************************
interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerData: FooterColumn[] = [
  {
    title: 'Information',
    links: [
      { name: 'About oChoice', href: '/about' },
      { name: 'How to shop on oChoice', href: '/how-to-shop' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact us', href: '/contact' },
      { name: 'Log in', href: '/login' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { name: 'Payment Methods', href: '/payments' },
      { name: 'Money-back guarantee!', href: '/guarantee' },
      { name: 'Returns', href: '/returns' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { name: 'Sign In', href: '/signin' },
      { name: 'View Cart', href: '/cart' },
      { name: 'My Wishlist', href: '/wishlist' },
      { name: 'Track My Order', href: '/track-order' },
      { name: 'Help', href: '/help' },
    ],
  },
];

// **********************************************
// 2. লোগো কম্পোনেন্ট
// **********************************************
const CustomLogo: React.FC = () => (
    <Link href="/" className="text-2xl font-bold text-gray-800 transition duration-200 hover:text-gray-900">
        <span className="text-orange-400">o</span>Choice
    </Link>
);


// **********************************************
// 3. মূল Footer কম্পোনেন্ট
// **********************************************
const Footer: React.FC = () => {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">

        {/* --- Top Section: About, Links, and Contact --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8">
          
          {/* Column 1: About and Contact */}
          <div className="col-span-2 md:col-span-2">
            <CustomLogo />
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-sm">
              Praesent dapibus, neque id cursus uctus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi.
            </p>
            
            <div className="mt-6">
              <p className="text-sm text-gray-700">Got Question? Call us 24/7</p>
              <a 
                href="tel:+0123456789" 
                className="text-xl font-semibold text-green-600 hover:text-green-700 transition duration-200 block mt-1"
              >
                +0123 456 789
              </a>
            </div>

            <div className="mt-6">
              <p className=" text-base font-bold text-gray-800 mb-4">Payment Method</p>
               <p className="text-sm text-gray-700 mb-2">Our All Delevery Are Cash On</p>
              
              {/* <div className="flex space-x-2">
                <Image src="/images/visa.png" alt="Visa" width={35} height={20} className="border rounded" />
                <Image src="/images/mastercard.png" alt="Mastercard" width={35} height={20} className="border rounded" />
                <Image src="/images/paypal.png" alt="PayPal" width={35} height={20} className="border rounded" />
                <Image src="/images/american-express.png" alt="Amex" width={35} height={20} className="border rounded" />
                <Image src="/images/apple-pay.png" alt="Apple Pay" width={35} height={20} className="border rounded" />
                
              </div>  */}
            </div>
          </div>

          {/* Column 2, 3, 4: Information, Customer Service, My Account */}
          {footerData.map((column, index) => (
            <div key={index} className="md:col-span-1">
              <h4 className="text-base font-bold text-gray-800 mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 hover:text-orange-400 transition duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Scroll to Top Button (Client-side functionality) */}
          <div className="absolute right-4 bottom-4 md:static md:col-span-1 flex justify-end items-end">
            <button
              onClick={handleScrollToTop}
              className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition duration-200 shadow-md"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* --- Bottom Bar: Copyright and Social Media --- */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          
          <div className="flex space-x-4 mb-3 md:mb-0">
            <span>Copyright © 2024 oChoice Store. All Rights Reserved.</span>
            <Link href="/terms" className="hover:text-orange-400 border-l pl-4">Terms Of Use</Link>
            <Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            <span className="mr-2">Social Media</span>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-200"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition duration-200"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-500 hover:text-red-500 transition duration-200"><i className="fab fa-pinterest-p"></i></a>
            <a href="#" className="text-gray-500 hover:text-red-500 transition duration-200"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Scroll To Top Button (Hidden on larger screens, but visible on small screens - Client Component needs to be imported or use 'use client') */}
        <button
            onClick={handleScrollToTop} // This requires 'use client'
            className="md:hidden fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full text-gray-600 shadow-xl hover:bg-gray-100 transition duration-200"
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;