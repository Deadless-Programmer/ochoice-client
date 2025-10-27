'use client'; // এটি একটি Client Component, তাই এই ডাইরেক্টিভটি অপরিহার্য।

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, ShoppingCart, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; // Notification-এর জন্য react-hot-toast ব্যবহার করা হয়েছে

// **********************************************
// 1. ডেটাবেস (MongoDB) মডেলের অনুকরণে TypeScript Interface
// **********************************************
interface CartItem {
  _id: string; // MongoDB ObjectId
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  altText: string;
  stock: number;
}

// **********************************************
// 2. ডামি ডেটা (যা MongoDB থেকে ফেচ হওয়ার কথা)
// **********************************************
const DUMMY_CART_DATA: CartItem[] = [
  {
    _id: '66a1d47c40d8d000109f23e7',
    name: 'Brown Paperbag Waist Skirt',
    price: 60.00,
    quantity: 1,
    imageUrl: '/images/skirt-main.jpg', // আপনার পাবলিক ফোল্ডারে এই ইমেজটি রাখুন
    altText: 'Stylish Brown Skirt',
    stock: 5,
  },
  {
    _id: '66a1d47c40d8d000109f23e8',
    name: 'Classic White T-Shirt',
    price: 25.50,
    quantity: 2,
    imageUrl: '/images/white-tshirt.jpg', // ডামি ইমেজ পাথ
    altText: 'Casual White T-Shirt',
    stock: 12,
  },
  {
    _id: '66a1d47c40d8d000109f23e9',
    name: 'Slim Fit Denim Jeans',
    price: 85.00,
    quantity: 1,
    imageUrl: '/images/denim-jeans.jpg', // ডামি ইমেজ পাথ
    altText: 'Blue Denim Jeans',
    stock: 8,
  },
];

// **********************************************
// 3. CartPage কম্পোনেন্ট
// **********************************************
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(DUMMY_CART_DATA);
  const [isBuying, setIsBuying] = useState(false);

  // কার্ট থেকে আইটেম রিমুভ করার ফাংশন
  const handleRemoveItem = (_id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== _id));
    toast.success('Item removed from cart!');
  };

  // পরিমাণের পরিবর্তন হ্যান্ডেল করা
  const handleQuantityChange = (_id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // পরিমাণ ১-এর নিচে হতে পারবে না

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === _id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // টোটাল ক্যালকুলেশন
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.10; // 10% tax
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + tax + shipping;

  // Buy Now লজিক (প্রোডাকশন-এ API কল হবে)
  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setIsBuying(true);
    // ডেটাবেস ট্রানজ্যাকশন সিমুলেশন
    setTimeout(() => {
      setIsBuying(false);
      setCartItems([]); // সফল হলে কার্ট খালি করা
      toast.success(`Purchase successful! Total paid: $${total.toFixed(2)}`);
      // এখানে ইউজারকে অর্ডার কনফার্মেশন পেইজে রিডাইরেক্ট করা যেতে পারে
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
          <ShoppingCart className="w-8 h-8 mr-3 text-orange-500" /> Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* কার্ট আইটেম লিস্ট */}
          <div className="lg:col-span-2 bg-white p-6  shadow-lg space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p className="text-2xl font-semibold">Your cart is empty. 😔</p>
                <p className="mt-2">Add some awesome products to your cart!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border-b last:border-b-0 py-4"
                >
                  <div className="relative w-24 h-24 shrink-0 mr-4  overflow-hidden border border-gray-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.altText}
                      fill
                      sizes="96px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h2>
                    <p className="text-gray-600 text-sm">Price: ${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-4 ml-4">
                    {/* Quantity Input */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-x border-gray-300 focus:outline-none"
                      />
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-xl font-bold text-gray-900 w-24 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition duration-150"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* অর্ডারের সারাংশ */}
          <div className="lg:col-span-1 bg-white p-6  shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Order Summary</h2>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span>Shipping</span>
                <span className="font-medium">{shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
              </div>
              
              <div className="flex justify-between pt-3 text-xl font-extrabold text-gray-900">
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* BUY NOW বাটন */}
            <button
              onClick={handleBuyNow}
              disabled={cartItems.length === 0 || isBuying}
              className="mt-6 w-full py-3 bg-orange-400 text-white text-lg font-semibold  shadow-md hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBuying ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'BUY NOW'
              )}
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