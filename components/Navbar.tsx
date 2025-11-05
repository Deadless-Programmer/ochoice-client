"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import NavbarSkeleton from "./NavbarSkeleton";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // ⭐️ New state to track scroll position for dynamic styling
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const { user, loading, initialized } = auth;

  // ⭐️ useEffect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is past a certain threshold (e.g., 50px)
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]); // Re-run effect only if isScrolled changes

if (!initialized) {
  return <NavbarSkeleton/>
}


  if (loading && !user) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Loading...
    </div>
  );
}

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(logout());
      if (logout.fulfilled.match(res)) {
        router.push("/");
      } else {
        console.log("❌ Login failed:", res.payload);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }

    console.log("logout");
  };

  return (
    // ⭐️ Fixed Positioning, Full Width, High Z-Index for "always on top"
    // ⭐️ Dynamic background/shadow based on scroll for smooth effect
    <nav
      className={`
        sticky top-0 w-full z-50 transition-all duration-300 ease-in-out  max-w-7xl mx-auto
        ${
          isScrolled
            ? "bg-white shadow-lg" // Scrolled: White background, subtle shadow
            : "bg-white shadow-sm " // Top: Original shadow, constrained width
        }
      `}
    >
      <div
        // ⭐️ Full width content container when fixed, centered when at top
        className={
          `mx-auto flex items-center justify-between px-6 py-4 
            ${isScrolled ? "max-w-full" : "max-w-7xl"}` // Adjust max-width based on scroll
        }
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <span className="text-orange-400">o</span>Choice
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Login / Signup */}
          <div className="hidden md:flex items-center gap-3">
            {!initialized ? null : user ?(
              <span
                onClick={handleLogout}
                className="text-gray-700 border cursor-pointer border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
              >
                Logout
              </span>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
            <Link
              href="/register"
              className="bg-orange-400 text-white px-3 py-1.5 rounded-md text-sm hover:bg-orange-500 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Cart */}
          <Link href="/cart">
            <div className="relative cursor-pointer text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">
                2
              </span>
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="relative cursor-pointer text-gray-600">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white border-t text-gray-700">
          <li>
            <Link href="/" onClick={toggleMenu}>
              HOME
            </Link>
          </li>
          <li>
            <Link href="/shop" onClick={toggleMenu}>
              SHOP
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={toggleMenu}>
              BLOG
            </Link>
          </li>

          <li>
            <Link href="/login" onClick={toggleMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" onClick={toggleMenu}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
