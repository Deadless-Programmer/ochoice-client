"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSingleProduct } from "@/redux/features/productSlice";
import { toast } from "react-toastify";


export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const { singleProduct, singleProductLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id as string));
    }
  }, [id, dispatch]);


  // const handleAddToCart = () => {
  //   if (!singleProduct?.stock) {
  //     toast.error("Out of stock!");
  //     return;
  //   }
  //   toast.success(`${singleProduct.name} added to cart!`);
   
  // };

  if (singleProductLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }


  if (!singleProduct) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-gray-600">Product not found.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white  hover:bg-yellow-600"
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
        <div className="relative w-full h-[500px] border -lg overflow-hidden">
          <Image
            src={singleProduct.image}
            alt={singleProduct.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-3">
          {singleProduct.colors.map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: c }}
              className="w-12 h-12  border cursor-pointer"
            ></div>
          ))}
        </div>
      </div>

      {/* Right Details Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">{singleProduct.name}</h2>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < singleProduct.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={i < singleProduct.rating ? "#facc15" : "none"}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({singleProduct.reviews} Reviews)
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-yellow-600">
          ${singleProduct.price.toFixed(2)}
        </p>

        <p className="mt-4 text-gray-600">{singleProduct.description}</p>

        <div className="mt-6">
          <h4 className="font-medium mb-2 text-sm">Size</h4>
          <select className="border p-2  text-sm">
            <option>Select a size</option>
            {singleProduct.size.map((s) => (
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
          <button onClick={() => setQty(qty + 1)} className="px-3 py-1 border">
            +
          </button>
        </div>

        <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition ">
          <ShoppingCart size={18} /> Add to Cart
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Category: <span className="text-gray-800">{singleProduct.category}</span>
        </p>
        <p className="text-sm text-gray-500">
          Brand: <span className="text-gray-800">{singleProduct.brand}</span>
        </p>
      </div>
    </div>
  );
}
