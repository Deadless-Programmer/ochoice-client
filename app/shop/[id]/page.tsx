"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

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

// -------- Same Product Data (can later move to API) --------
const products: Product[] = [
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
    rating: 4,
    reviews: 2,
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
];

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-gray-600">Product not found.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Image Section */}
      <div className="space-y-4">
        <div className="relative w-full h-[500px] border rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-3">
          {product.colors.map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: c }}
              className="w-12 h-12 rounded border cursor-pointer"
            ></div>
          ))}
        </div>
      </div>

      {/* Right Details Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={i < product.rating ? "#facc15" : "none"}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviews} Reviews)
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-yellow-600">
          ${product.price.toFixed(2)}
        </p>

        <p className="mt-4 text-gray-600">{product.description}</p>

        <div className="mt-6">
          <h4 className="font-medium mb-2 text-sm">Size</h4>
          <select className="border p-2 rounded text-sm">
            <option>Select a size</option>
            {product.size.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm">Qty:</span>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-1 border"
          >
            -
          </button>
          <span className="px-3">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-1 border"
          >
            +
          </button>
        </div>

        <button
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition rounded"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Category: <span className="text-gray-800">{product.category}</span>
        </p>
        <p className="text-sm text-gray-500">
          Brand: <span className="text-gray-800">{product.brand}</span>
        </p>
      </div>
    </div>
  );
}
