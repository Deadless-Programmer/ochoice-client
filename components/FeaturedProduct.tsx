"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

// **********************************************
// Product Interface
// **********************************************
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  label?: string | null;
  colors: string[];
  rating: number;
  reviews: number;
  stock: boolean;
  brand: string;
  size: string[];
  description: string;
}

// **********************************************
// Sample Product (Featured)
// **********************************************
const featuredProduct: Product = {
  id: 'ggfgdfg',
  name: "Wireless Bluetooth Headphones",
  category: "Electronics",
  price: 99.99,
  oldPrice: 129.99,
  image:
    "https://images.unsplash.com/photo-1748189517364-cda16989c1c6?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80",
  label: "Sale",
  colors: ["#000000", "#ffffff", "#ff0000"],
  rating: 4,
  reviews: 86,
  stock: true,
  brand: "Sony",
  size: ["S", "M", "L"],
  description:
    "Experience premium sound quality and comfort with our latest wireless headphones. Perfect for music lovers and gamers alike.",
};

// **********************************************
// FeaturedProductCard Component
// **********************************************
const FeaturedProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    label,
    colors,
    rating,
    reviews,
    brand,
    stock,
    size,
    description,
  } = product;

  //   const handleBuyNow = () => toast.success('Redirecting to checkout for Buy Now!');
  const handleAddToCart = () => {
    if (!stock) return toast.error("This item is currently out of stock.");
    toast.success("Product added to cart!");
  };

  return (
    <div className="bg-white shadow-xl  overflow-hidden max-w-5xl mx-auto my-12 p-8 border border-gray-100">
      <h2 className="text-3xl font-light text-center mb-10 text-gray-800">
        Featured Product
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Image */}
        <div className="w-full lg:w-2/5 flex flex-col items-center">
          <div className="relative w-full h-96 mb-4 rounded-lg overflow-hidden">
            {label && (
              <span
                className={`absolute top-0 left-0 text-white text-sm font-bold px-3 py-1 z-10 rounded-br-lg ${
                  label === "Sale" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {label}
              </span>
            )}

            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Thumbnail preview */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={`relative w-16 h-16 cursor-pointer rounded-md overflow-hidden ${
                  index === 0
                    ? "border-2 border-orange-500"
                    : "border border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold text-gray-500 uppercase">
              {category} / {brand}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-4">
              {name}
            </h1>

            {/* Price & Wishlist */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition" />
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 italic">{description}</p>

            {/* Rating & Stock */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.32 6.91.99-5 4.88 1.18 6.88L12 18.06l-6.18 3.24 1.18-6.88-5-4.88 6.91-.99L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({reviews} Reviews)
                </span>
              </div>

              <span
                className={`py-1 px-2 text-sm font-medium rounded-full ${
                  stock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Colors & Sizes */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <span className="font-medium text-gray-700 mr-3">Color:</span>
                {colors.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-300 mr-2 cursor-pointer hover:ring-2 hover:ring-offset-2"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>

              <div className="flex items-center">
                <span className="font-medium text-gray-700 mr-3">Size:</span>
                {size.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 border border-gray-300 rounded text-sm mr-2 cursor-pointer hover:bg-gray-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          
              <button
                onClick={handleAddToCart}
                disabled={!stock}
                className="flex-1 px-6 py-3 border border-orange-400 text-orange-400 font-semibold rounded-lg hover:bg-orange-50 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </button>
           

            {/* <button
              onClick={handleBuyNow}
              disabled={!stock}
              className="flex-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUY NOW
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// **********************************************
// Page Component
// **********************************************
const FeaturedProduct: React.FC = () => {
  return <FeaturedProductCard product={featuredProduct} />;
};

export default FeaturedProduct;
