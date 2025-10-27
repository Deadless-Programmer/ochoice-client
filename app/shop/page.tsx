"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, } from "lucide-react";
import Link from "next/link";

// -------- Product Type --------
interface Product {
  id: number;
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

// -------- Sample Data --------
export const products: Product[] = [
  {
    id: 1,
    name: "Brown paperbag waist pencil skirt",
    category: "Women",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    label: "NEW",
    colors: ["#c27b48", "#d2b48c"],
    rating: 4,
    reviews: 2,
    stock: true,
    brand: "Next",
    size: ["S", "M", "L"],
    description:
      "A chic brown paperbag waist skirt designed with a flattering pencil cut. Perfect for both work and evening outings.",
  },
  {
    id: 2,
    name: "Dark yellow lace cut out swing dress",
    category: "Dresses",
    price: 84,
    image:
      "https://images.unsplash.com/photo-1602423763918-6ae68bca77c8?auto=format&fit=crop&w=687&q=80",
    rating: 0,
    reviews: 0,
    stock: true,
    brand: "River Island",
    size: ["M", "L", "XL"],
    colors: ["#e0aa3e", "#f7d560"],
    description:
      "Elegant lace swing dress in dark yellow with beautiful cut-out details for a timeless, feminine look.",
  },
  {
    id: 3,
    name: "Khaki utility boiler jumpsuit",
    category: "Jackets",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    label: "Out of Stock",
    rating: 5,
    reviews: 6,
    stock: false,
    brand: "Geox",
    size: ["M", "L"],
    colors: ["#8a9a5b", "#6b705c"],
    description:
      "Utility-style khaki jumpsuit made from durable fabric with a modern fit and multiple pockets.",
  },
  {
    id: 4,
    name: "Blue utility pinafore denim dress",
    category: "Jeans",
    price: 76,
    image:
      "https://images.unsplash.com/photo-1730385781420-77c5ef5f0539?auto=format&fit=crop&w=687&q=80",
    rating: 4,
    reviews: 2,
    stock: true,
    brand: "New Balance",
    size: ["S", "M", "L"],
    colors: ["#0000ff", "#1e3a8a"],
    description:
      "Trendy denim pinafore dress designed for everyday comfort and effortless layering.",
  },
  {
    id: 5,
    name: "Beige knitted elastic runner shoes",
    category: "Shoes",
    price: 84,
    image:
      "https://images.unsplash.com/photo-1726133812290-1fcc8a0658a4?auto=format&fit=crop&w=765&q=80",
    label: "NEW",
    rating: 0,
    reviews: 0,
    stock: true,
    brand: "UGG",
    size: ["M", "L", "XL"],
    colors: ["#f5deb3", "#d2b48c"],
    description:
      "Soft and breathable elastic runner shoes with premium knit finish and cushioned sole.",
  },
  {
    id: 6,
    name: "Orange saddle lock front chain cross body bag",
    category: "Bags",
    price: 84,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    reviews: 1,
    stock: true,
    brand: "Nike",
    size: ["S"],
    colors: ["#ff8c00", "#f4a261"],
    description:
      "Compact orange crossbody bag with gold chain detailing, perfect for travel or casual styling.",
  },
];

// -------- Component --------
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueSizes = Array.from(new Set(products.flatMap((p) => p.size)));
  const uniqueColors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
      {/* ---------------- LEFT FILTER SIDEBAR ---------------- */}
      <aside className="space-y-6 border-r pr-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Filters:
          </h3>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-yellow-600 hover:underline"
          >
            Clean All
          </button>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Category</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {uniqueCategories.map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className="accent-yellow-500"
                />
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Size */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Size</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {uniqueSizes.map((size) => (
              <li key={size} className="flex items-center gap-2">
                <input type="checkbox" className="accent-yellow-500" />
                {size}
              </li>
            ))}
          </ul>
        </div>

        {/* Colour */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Colour</h4>
          <div className="flex flex-wrap gap-2">
            {uniqueColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
              ></span>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Brand</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {uniqueBrands.map((brand) => (
              <li key={brand} className="flex items-center gap-2">
                <input type="checkbox" className="accent-yellow-500" />
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Price</h4>
          <p className="text-xs text-gray-500 mb-1">
            Price Range: <span className="text-yellow-600">$0 – $950</span>
          </p>
          <input
            type="range"
            min="0"
            max="950"
            className="w-full accent-yellow-500"
          />
        </div>
      </aside>

      {/* ---------------- RIGHT PRODUCT GRID ---------------- */}
      <main>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <p>
            Showing{" "}
            <span className="font-medium">{filteredProducts.length}</span> of{" "}
            {products.length} Products
          </p>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select className="border px-2 py-1 text-gray-600">
              <option>Date</option>
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-amber-50 hover:border-amber-500 shadow-sm hover:shadow-lg transition p-4 relative"
            >
              {product.label && (
                <span
                  className={`absolute top-2 left-2 text-xs px-2 py-1 z-10 ${
                    product.label?.toLowerCase().includes("new")
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {product.label}
                </span>
              )}

              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="text-base font-semibold">{product.name}</h3>

                <div className="flex justify-center items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={i < product.rating ? "#facc15" : "none"}
                    />
                  ))}
                  <span className="text-xs text-gray-500">
                    ({product.reviews} Reviews)
                  </span>
                </div>

                <div className="mt-2 text-gray-800">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex justify-center gap-2 mt-2">
                  {product.colors.map((c, i) => (
                    <span
                      key={i}
                      style={{ backgroundColor: c }}
                      className="w-4 h-4 rounded-full border border-gray-300"
                    ></span>
                  ))}
                </div>

                <Link href={`/shop/${product.id}`}>
                  <button
                    className={`mt-3 w-full flex items-center justify-center gap-2 py-2 text-sm font-medium transition 
      bg-yellow-500 text-white hover:bg-yellow-600
    `}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
