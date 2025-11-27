// Step 2: Update your Shop page component (Shop.tsx)
// - Add states for multiple selections (arrays for categories, brands, sizes, colors).
// - Use allProducts for unique values.
// - Dispatch initial fetchProducts() if allProducts empty.
// - On filter changes, dispatch fetchProducts with params.
// - Update checkboxes/swatches to toggle in arrays.
// - Update price slider to set maxPrice, label dynamically.
// - Map sort dropdown to backend values.
// - Add pagination controls below grid (simple prev/next buttons).
// - Remove local filteredProducts; use products from Redux (filtered).
// - Clean All resets states and dispatches with empty params.
// - Add slight visual for selected colors (ring), but minimal change.
// - No search input added (UI unchanged).

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/features/productSlice";
import SkeletonCard from "@/components/SkeletonCard";

// -------- Component --------
export default function Shop() {
  const dispatch = useAppDispatch();
  const { products, allProducts, pagination, loading, error } = useAppSelector((state) => state.products);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(950);
  const [sort, setSort] = useState<string>("newest");
  const [page, setPage] = useState<number>(1);

  // Initial fetch for allProducts
  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  // Fetch filtered when filters change
  useEffect(() => {
    const params = {
      category: selectedCategories,
      brand: selectedBrands,
      size: selectedSizes,
      color: selectedColors, 
      minPrice: 0,
      maxPrice,
      sort,
      page,
      limit: 20,
    };
    dispatch(fetchProducts(params));
  }, [dispatch, selectedCategories, selectedBrands, selectedSizes, selectedColors, maxPrice, sort, page]);

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
     <SkeletonCard></SkeletonCard>
    );

  // Uniques from allProducts
  const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category)));
  const uniqueSizes = Array.from(new Set(allProducts.flatMap((p) => p.size)));
  const uniqueColors = Array.from(new Set(allProducts.flatMap((p) => p.colors)));
  const uniqueBrands = Array.from(new Set(allProducts.map((p) => p.brand)));

  // Toggle helpers
  const toggleSelection = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  // Clean All
  const cleanAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(8000000);
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
      {/* ---------------- LEFT FILTER SIDEBAR ---------------- */}
      <aside className="space-y-6 border-r pr-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Filters:
          </h3>
          <button
            onClick={cleanAll}
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
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleSelection(selectedCategories, setSelectedCategories, cat)}
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
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSelection(selectedSizes, setSelectedSizes, size)}
                  className="accent-yellow-500"
                />
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
                className={`w-5 h-5 rounded-full border border-gray-300 cursor-pointer ${
                  selectedColors.includes(color) ? "ring-2 ring-yellow-500" : ""
                }`}
                onClick={() => toggleSelection(selectedColors, setSelectedColors, color)}
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
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleSelection(selectedBrands, setSelectedBrands, brand)}
                  className="accent-yellow-500"
                />
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Price</h4>
          <p className="text-xs text-gray-500 mb-1">
            Price Range: <span className="text-yellow-600">$0 – ${maxPrice}</span>
          </p>
          <input
            type="range"
            min="0"
            max="950"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>
      </aside>

      {/* ---------------- RIGHT PRODUCT GRID ---------------- */}
      <main>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <p>
            Showing{" "}
            <span className="font-medium">{products.length}</span> of{" "}
            {pagination?.total || allProducts.length} Products
          </p>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select 
              className="border px-2 py-1 text-gray-600"
              value={
                sort === "newest" ? "Newest" :
                sort === "price_asc" ? "Price: Low to High" :
                "Price: High to Low"
              }
              onChange={(e) => {
                const val = e.target.value;
                setSort(
                  val === "Newest" ? "newest" :
                  val === "Price: Low to High" ? "price_asc" :
                  "price_desc"
                );
              }}
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div> 
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
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

                <Link href={`/shop/${product._id}`}>
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

        {/* Pagination */}
        {pagination && (
          <div className="flex justify-center items-center gap-4 mt-8 text-sm">
            <button
              disabled={!pagination.hasPrev}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border bg-yellow-500 text-white disabled:opacity-50 hover:bg-yellow-600"
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              disabled={!pagination.hasNext}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border bg-yellow-500 text-white disabled:opacity-50 hover:bg-yellow-600"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}