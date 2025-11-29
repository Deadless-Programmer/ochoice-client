// app/dashboard/seller/create-product/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "@/redux/features/productApi";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    productId:"",
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    colors: [""],
    stock: true,
    brand: "",
    size: [""],
    description: "",
    label: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setFormData(prev => ({ ...prev, colors: [...prev.colors, ""] }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...formData.size];
    newSizes[index] = value;
    setFormData(prev => ({ ...prev, size: newSizes }));
  };

  const addSize = () => {
    setFormData(prev => ({ ...prev, size: [...prev.size, ""] }));
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({ ...prev, size: prev.size.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        productId:formData.productId,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      image: formData.image,
      colors: formData.colors.filter(c => c.trim() !== ""),
      stock: formData.stock,
      brand: formData.brand,
      size: formData.size.filter(s => s.trim() !== ""),
      description: formData.description,
      label: formData.label || undefined,
    };

    try {
      await createProduct(payload).unwrap();
      toast.success("Product created successfully!");
      router.push("/dashboard/seller/myProducts");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create product");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/seller/myProducts"
              className="text-orange-600 hover:underline flex items-center gap-2"
            >
              <ArrowLeft size={20} /> Back to Products
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Create New Product</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-96 relative overflow-hidden bg-gray-50">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Upload size={48} />
                    <p className="mt-3 text-lg">Paste Image URL below</p>
                  </div>
                )}
              </div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-4 w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                required
              />
            </div>

            {/* Right Column - Form Fields */}
            <div className="space-y-6">
              {/* Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Id</label>
                  <input
                    type="number"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Price & Old Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label> */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (Optional)</label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    placeholder="Leave empty if no discount"
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Brand & Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label (NEW, SALE)</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                <div className="space-y-2">
                  {formData.colors.map((color, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(i, e.target.value)}
                        placeholder="#000000 or red"
                        className="flex-1 px-4 py-3 border rounded-lg  focus:ring-orange-500"
                      />
                      {formData.colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColor(i)}
                          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addColor}
                    className="text-orange-600 hover:underline flex items-center gap-1 text-sm"
                  >
                    <Plus size={18} /> Add Color
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                <div className="space-y-2">
                  {formData.size.map((size, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => handleSizeChange(i, e.target.value)}
                        placeholder="S, M, L, XL"
                        className="flex-1 px-4 py-3 border rounded-lg  focus:ring-orange-500"
                      />
                      {formData.size.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSize(i)}
                          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSize}
                    className="text-orange-600 hover:underline flex items-center gap-1 text-sm"
                  >
                    <Plus size={18} /> Add Size
                  </button>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                <select
                  name="stock"
                  value={formData.stock ? "true" : "false"}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value === "true" }))}
                  className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg  focus:ring-orange-500"
                  placeholder="Write a detailed description..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-end gap-4">
            <Link
              href="/dashboard/seller/myProducts"
              className="px-8 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 bg-orange-600 cursor-pointer text-white rounded-xl hover:bg-orange-700 disabled:opacity-70 transition font-medium text-lg"
            >
              {isLoading ? "Creating Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}