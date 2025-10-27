"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className=" bg-white shadow-sm max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <span className="text-orange-400">o</span>Choice
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/shop">SHOP</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
          {/* <li><Link href="/pages">PAGES</Link></li> */}
          <li><Link href="/blog">BLOG</Link></li>
          
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Login / Signup */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-orange-400 text-white px-3 py-1.5 rounded-md text-sm hover:bg-orange-500 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Cart */}
          <Link  href="/cart">
          <div className="relative cursor-pointer text-gray-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">2</span>
          </div></Link>
          <Link  href="/dashboard">
          <div className="relative cursor-pointer text-gray-600">
            
            <LayoutDashboard className="w-5 h-5" />
          </div></Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white border-t text-gray-700">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/shop">SHOP</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
          {/* <li><Link href="/pages">PAGES</Link></li> */}
          <li><Link href="/blog">BLOG</Link></li>
         
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
