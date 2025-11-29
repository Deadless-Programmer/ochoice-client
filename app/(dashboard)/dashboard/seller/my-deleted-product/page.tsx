// app/dashboard/seller/my-deleted-products/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetDeletedProductsQuery,
  useRestoreProductMutation,
} from "@/redux/features/productApi";
import ConfirmModal from "@/components/ConfirmModal";

export default function MyDeletedProductsPage() {
  const {
    data: deletedData,
    isLoading,
    isError,
    refetch,
  } = useGetDeletedProductsQuery(undefined);

  const [restoreProduct, { isLoading: isRestoring }] = useRestoreProductMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("");

  const products = deletedData?.data || [];

  const handleRestore = async () => {
    if (!selectedId) return;
    try {
      await restoreProduct(selectedId).unwrap();
      toast.success(`${selectedName} restored successfully!`);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to restore");
    } finally {
      setModalOpen(false);
      setSelectedId(null);
      setSelectedName("");
    }
  };

  const openRestoreModal = (id: string, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="text-xl text-gray-600">Loading deleted products...</div>
      </div>
    );
  }

  if (isError || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <Link
          href="/dashboard/seller/myProducts"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft size={20} /> Back to My Products
        </Link>
        <p className="text-gray-600 text-lg">
          {isError ? "Failed to load." : "No deleted products found."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/seller/myProducts"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <ArrowLeft size={20} /> Back
            </Link>
            <h1 className="text-3xl font-bold text-red-600">
              Deleted Products ({products.length})
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-white  shadow-lg overflow-hidden border-2 border-red-200 relative opacity-90"
            >
              {/* Deleted Badge */}
              <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 font-bold text-sm z-10">
                DELETED
              </div>

              <div className="pt-10 relative h-64">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover grayscale"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg truncate text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">{product.category}</p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-600">
                    ${product.price}
                  </span>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => openRestoreModal(product._id, product.name)}
                    disabled={isRestoring}
                    className="w-full py-3 bg-green-600 text-white  hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <RotateCcw size={18} />
                    {isRestoring ? "Restoring..." : "Restore Product"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restore Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleRestore}
        title="Restore Product"
        message={`Are you sure you want to restore "${selectedName}"? It will appear in your active products again.`}
        confirmText={isRestoring ? "Restoring..." : "Yes, Restore"}
        cancelText="Cancel"
      />
    </>
  );
}