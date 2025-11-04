// ConditionalNavbar.jsx
"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  console.log('Current pathname:', pathname)
  
  // Duto specific path-ke exclude koro
  if (pathname === "/login" || pathname === "/register" || pathname ==="/createAUser" || pathname ==="/changePassword") {
    return null; 
  }

  if(pathname.startsWith("/dashboard")){
    return null;
  }
  
  // Jodi bishal onyo kono Auth page thake, tahole ei line-ta rakhte paro.
  // Kintu beshirbhag kshetre uporer duto check-i kaaj kore.
  // if (pathname.startsWith("/auth")) return null; 

  return <Navbar />;
}