
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ConditionalNavbar from "@/components/ConditionalNavbar";
import Providers from "./providers";
import AuthInitializer from "@/components/AuthInitializer";
import { ToastContainer } from "react-toastify";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'oChoice | Your Smart E-commerce',
  description: 'E-commerce site built with Next.js 14 + TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >

        
        
       <Providers>
        <ConditionalNavbar />
        <AuthInitializer/>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        </Providers>
      </body>
    </html>
  );
}
