"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <section className="bg-gray-50 mt-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Hero Banner ---------- */}
        <div className="relative w-full h-96 mb-16  overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="About oChoice"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-wide mb-2">
              About oChoice
            </h1>
            <p className="text-lg font-light">Smart Shopping, Made Simple</p>
          </div>
        </div>

        {/* ---------- Mission & Vision ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              At oChoice, we aim to redefine the online shopping experience through
              innovation, transparency, and trust. Our goal is to connect quality
              products with modern shoppers in the simplest and most reliable way.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              We envision a future where every customer enjoys seamless, secure, and
              satisfying shopping — powered by technology and care.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To offer premium, authentic, and affordable products with unmatched
              customer service. Whether it’s fashion, lifestyle, or tech — oChoice
              helps you make confident choices every day.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              We’re building a trusted community of brands and customers — one
              purchase at a time.
            </p>
          </div>
        </div>

        {/* ---------- Who We Are ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-orange-500 font-semibold mb-4">
              Passionate about quality, driven by innovation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              oChoice is a modern eCommerce platform built to bring shoppers and
              premium brands closer together. From curated collections to fast
              delivery, we’re committed to making your online shopping experience
              smooth, secure, and enjoyable.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-orange-500 text-orange-500 font-semibold text-sm uppercase tracking-wider rounded hover:bg-orange-50 transition duration-200"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64  overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                alt="Office teamwork"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="relative h-64  overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                alt="Team collaboration"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* ---------- Core Values ---------- */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                desc: "We prioritize quality at every step, ensuring every product meets our high standards.",
                icon: "https://cdn-icons-png.flaticon.com/512/1040/1040238.png",
              },
              {
                title: "Trust",
                desc: "Our customers are at the heart of what we do — honesty and reliability define us.",
                icon: "https://cdn-icons-png.flaticon.com/512/3159/3159310.png",
              },
              {
                title: "Innovation",
                desc: "We constantly explore new ideas to deliver smarter and faster shopping experiences.",
                icon: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white shadow-md  p-8 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Partner Logos ---------- */}
        <div className="pt-10 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">
            Trusted by leading brands & global partners
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 opacity-80">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png",
              "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
              "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg"
            ].map((logo, i) => (
              <div key={i} className="relative h-10 w-full flex items-center justify-center">
                <Image
                  src={logo}
                  alt={`Brand logo ${i + 1}`}
                  fill
                  style={{ objectFit: "contain", padding: "0.5rem" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
