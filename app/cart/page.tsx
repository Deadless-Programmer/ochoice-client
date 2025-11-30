"use client";

import Image from "next/image";
import { Trash2, Loader2, ShoppingCart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetUserCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cartApi";
import { useAppSelector } from "@/redux/hooks";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size?: string[];
  stock?: number;
}

const CartPage: React.FC = () => {
  // Use your auth state; assuming you have authLoading to indicate auth init
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  // RTK Query: get cart
  const {
    data: cartData,
    isLoading: cartLoading,
    isError,
    refetch,
  } = useGetUserCartQuery(userId || "", { skip: !userId });

  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  // Delete item
  const handleRemoveItem = async (id: string) => {
    if (!userId) return;
    try {
      await deleteCartItem({ id, userId }).unwrap();
      toast.success("Item removed from cart!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item.");
    }
  };

  // Update quantity
  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (!userId || newQuantity < 1) return;
    try {
      await updateCartItem({
        id: item._id,
        userId,
        quantity: newQuantity,
      }).unwrap();
      refetch();
      toast.success("Quantity updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity.");
    }
  };

  // Totals
  const subtotal =
    cartData?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shipping;

  // Buy Now
  const handleBuyNow = () => {
    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    const payload = cartData.map((item) => ({
      productId: item._id,
      name: item.name,
      size: item.size,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
      price: total.toFixed(2),
    }));
    console.log("Buy Now payload:", payload);
    toast.success("Check console for Buy Now payload.");
  };

  if (authLoading || cartLoading || !userId) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        <span>Loading your cart...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load cart. Please try again.
      </p>
    );
  }

  if (!cartData || cartData.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">Your cart is empty 😔</h2>
        <p>Add products to your cart!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <ShoppingCart className="w-8 h-8 mr-3 text-orange-500" /> Shopping
          Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 shadow-lg space-y-4">
            {cartData.map((item) => (
              <div
                key={item._id}
                className="flex items-center border-b last:border-b-0 py-4"
              >
                <div className="relative w-24 h-24 shrink-0 mr-4 overflow-hidden border border-gray-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="96px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-12 text-center border-x border-gray-300 focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xl font-bold text-gray-900 w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition duration-150"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartData.length} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}
                </span>
              </div>

              <div className="flex justify-between pt-3 text-xl font-extrabold text-gray-900">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              className="mt-6 w-full py-3 cursor-pointer bg-orange-400 text-white text-lg font-semibold shadow-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              BUY NOW
            </button>
            <p className="text-sm text-center text-gray-500 mt-3">
              Proceed to secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
