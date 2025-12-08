"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import NavbarSkeleton from "./NavbarSkeleton";
import { useGetUserCartQuery } from "@/redux/features/cartApi";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, loading, initialized } = useAppSelector((s) => s.auth);
  const userId = user?.id;

  // RTK Query: get cart
  const {
    data: cartData,
    isLoading: cartLoading,
  } = useGetUserCartQuery(userId || "", { skip: !userId });

  // ✅ Toggle menu (mobile)
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // ✅ Scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!initialized || loading) {
    return <NavbarSkeleton />;
  }

  // ✅ Handle Logout (Cleaned Version)
  const handleLogout = async () => {
    await dispatch(logout()); 
    router.push("/login"); 
    router.refresh(); 
  };

  return (
    <nav
      className={`sticky max-w-7xl mx-auto top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* ✅ Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <span className="text-orange-400">o</span>Choice
        </Link>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/shop">SHOP</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
          <li><Link href="/blog">BLOG</Link></li>
        </ul>

        {/* ✅ Right Section */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <span
                onClick={handleLogout}
                className="text-gray-700 border cursor-pointer border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
              >
                Logout
              </span>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-400 text-white px-3 py-1.5 rounded-md text-sm hover:bg-orange-500 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* ✅ Cart */}
          <Link href="/cart">
            <div className="relative cursor-pointer text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5">
                {cartLoading ? "..." : (cartData?.length || 0)}
              </span>
            </div>
          </Link>

          {/* ✅ Dashboard */}
          <Link href="/dashboard">
            <div className="relative cursor-pointer text-gray-600">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          </Link>

          {/* ✅ Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white border-t text-gray-700">
          <li><Link href="/" onClick={toggleMenu}>HOME</Link></li>
          <li><Link href="/shop" onClick={toggleMenu}>SHOP</Link></li>
          <li><Link href="/about" onClick={toggleMenu}>ABOUT</Link></li>
          <li><Link href="/blog" onClick={toggleMenu}>BLOG</Link></li>

          {user ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li><Link href="/login" onClick={toggleMenu}>Sign In</Link></li>
              <li><Link href="/register" onClick={toggleMenu}>Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;