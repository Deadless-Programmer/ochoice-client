// app/dashboard/seller/myProducts/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/productApi";
import ConfirmModal from "@/components/ConfirmModal";

export default function MyProductsPage() {
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetMyProductsQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = productsData?.data || [];

  // Delete Modal
  const openDeleteModal = (id: string, name: string) => {
    setSelectedProduct({ _id: id, name });
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct._id).unwrap();
      toast.success(`${selectedProduct.name} deleted successfully`);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to delete");
    } finally {
      setDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  // Edit Modal Open
  const openEditModal = (product: any) => {
    setSelectedProduct({
      ...product,
      colors: Array.isArray(product.colors) ? product.colors : [],
      size: Array.isArray(product.size) ? product.size : [],
    });
    setEditModal(true);
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!selectedProduct) return;

    const updateData = {
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: Number(selectedProduct.price),
      oldPrice: selectedProduct.oldPrice ? Number(selectedProduct.oldPrice) : undefined,
      image: selectedProduct.image,
      label: selectedProduct.label || "",
      colors: selectedProduct.colors,
      stock: selectedProduct.stock,
      brand: selectedProduct.brand,
      size: selectedProduct.size,
      description: selectedProduct.description || "",
    };

    try {
      await updateProduct({
        id: selectedProduct._id,
        data: updateData,
      }).unwrap();

      toast.success("Product updated successfully!");
      refetch();
      setEditModal(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update product");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="text-xl text-gray-600">Loading your products...</div>
      </div>
    );
  }

  if (isError || products.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 mb-6">
          {isError ? "Failed to load products." : "You haven't added any products yet."}
        </p>
        <Link
          href="/dashboard/seller/create-product"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Add Your First Product
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Products ({products.length})
          </h1>
          <Link
            href="/dashboard/seller/create-product"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-white  shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.label && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded">
                    {product.label}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.category}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.stock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock ? "In Stock" : "Out of Stock"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => openDeleteModal(product._id, product.name)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action can be undone later.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />

      {/* Edit Product Modal - All 11 Fields */}
     {/* Edit Product Modal - Compact & Beautiful */}
{editModal && selectedProduct && (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white  shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold">Edit Product</h2>
        <button
          onClick={() => setEditModal(false)}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={selectedProduct.category}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">Old Price (optional)</label>
            <input
              type="number"
              value={selectedProduct.oldPrice || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  oldPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="No discount"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <select
              value={selectedProduct.stock ? "true" : "false"}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value === "true" })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={selectedProduct.label || ""}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, label: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="NEW, SALE, HOT"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={selectedProduct.image}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            value={selectedProduct.brand}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Colors & Sizes - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma separated)</label>
            <input
              type="text"
              value={selectedProduct.colors.join(", ")}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  colors: e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="red, #000, blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
            <input
              type="text"
              value={selectedProduct.size.join(", ")}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  size: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="S, M, L, XL"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea
            value={selectedProduct.description || ""}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Short description..."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
        <button
          onClick={() => setEditModal(false)}
          className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 transition font-medium"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}