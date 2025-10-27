"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Living Room Furniture",
    subtitle: "Topsale Collection",
    buttonText: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
  },
  {
    id: 2,
    title: "Modern Sofa Set",
    subtitle: "Exclusive Design",
    buttonText: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    id: 3,
    title: "Stylish Home Decor",
    subtitle: "New Arrivals",
    buttonText: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
];

export default function Header() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="max-w-7xl mx-auto py-10 grid md:grid-cols-3 gap-6">
      {/* Main Slider */}
      <div className="md:col-span-2 relative overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === current ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 md:px-16 text-white">
                <p className="text-sm md:text-base mb-2">{slide.subtitle}</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <button className="border border-white px-5 py-2 text-sm flex items-center gap-2 hover:bg-white hover:text-black transition w-fit">
                  {slide.buttonText} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Right-side small banners */}
      <div className="flex flex-col gap-6">
        <div className="relative overflow-hidden ">
          <Image
            src="https://images.unsplash.com/photo-1520453714493-d85cdd7b033b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1144"
            alt="Chairs & Chaises"
            width={400}
            height={240}
            className="w-full h-[240px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 text-white flex flex-col justify-center px-6">
            <p className="text-sm mb-1">Clearence</p>
            <h3 className="text-lg font-bold leading-snug mb-3">
              Chairs & Chaises <br /> Up to 40% off
            </h3>
            <button className="border border-white px-4 py-1 text-sm flex items-center gap-1 hover:bg-white hover:text-black transition w-fit">
              SHOP NOW <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden ">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
            alt="Lighting Collection"
            width={400}
            height={240}
            className="w-full h-[240px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 text-white flex flex-col justify-center px-6">
            <p className="text-sm mb-1">New in</p>
            <h3 className="text-lg font-bold leading-snug mb-3">
              Best Lighting <br /> Collection
            </h3>
            <button className="border border-white px-4 py-1 text-sm flex items-center gap-1 hover:bg-white hover:text-black transition w-fit">
              DISCOVER NOW <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
