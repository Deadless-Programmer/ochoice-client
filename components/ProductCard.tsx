"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/features/productSlice";


export default function ProductCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);
  

      useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1); // mobile
      else if (window.innerWidth < 1024) setCardsPerView(2); // tablet
      else if (window.innerWidth < 1280) setCardsPerView(3); // desktop
      else setCardsPerView(4); // large screen
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    if (loading)
      return (
        <div className="text-center py-10 text-yellow-500 font-semibold">
          Loading products...
        </div>
      );
  
       if (error)
      return (
        <div className="text-center py-10 text-red-500 font-semibold">
          {error}
        </div>
      );
  
    if (!products || products.length === 0)
      return (
        <div className="text-center py-10 text-gray-500 font-medium">
          No products found.
        </div>
      );

  // ✅ Responsive cards-per-view setup


  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= products.length - cardsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - cardsPerView : prev - 1
    );
  };

  return (
    <section className="py-10 relative max-w-6xl mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trendy Products
      </h2>

      {/* Tabs */}
      {/* <div className="flex justify-center gap-6 mb-8 text-gray-600 uppercase text-sm font-medium">
        <span className="border-b-2 border-yellow-500 pb-1">All</span>
        <span>Furniture</span>
        <span>Decor</span>
        <span>Lighting</span>
      </div> */}

      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        {/* Prev */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute left-0 z-10"
        >
          <ChevronLeft />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden w-full px-10">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
            }}
          >
            {products?.map((product) => (
              <div
                key={product._id}
                className="shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center pb-4 shadow-xl overflow-hidden bg-white 
                transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]"
              >
                <div className="relative">
                  {product.label && (
                    <span className="absolute top-2 z-10 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      {product.label}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain h-48 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="mt-2 text-sm font-medium text-center">
                  {product.name}
                </h3>
                <p className="text-sm text-center">
                  ${product.price}
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ${product.oldPrice}
                    </span>
                  )}
                </p>

                {/* Colors */}
                <div className="flex mt-1 gap-2">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      style={{ backgroundColor: color }}
                      className="w-4 h-4 rounded-full border border-gray-300"
                    ></span>
                  ))}
                </div>

                {/* Button */}
                <Link href={`/shop/${product._id}`} className="w-full mt-3 px-4">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium 
                    bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300 shadow-sm"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute right-0 z-10"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
