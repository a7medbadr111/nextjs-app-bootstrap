"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen p-8 bg-white text-black" dir="rtl">
        <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>
        <p>سلة التسوق فارغة.</p>
        <Link
          href="/products"
          className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          تصفح المنتجات
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-white text-black" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border border-gray-300 rounded-lg p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md ml-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>الكمية: {item.quantity}</p>
              <p>السعر لكل وحدة: {item.price} EGP</p>
              <p>الإجمالي: {(item.price * item.quantity).toFixed(2)} EGP</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              إزالة
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-gray-400 text-black px-6 py-3 rounded-md hover:bg-gray-500 transition"
        >
          مسح السلة
        </button>
        <div className="text-2xl font-bold">
          الإجمالي: {totalPrice.toFixed(2)} EGP
        </div>
        <Link
          href="/checkout"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          إتمام الشراء
        </Link>
      </div>
    </main>
  );
}
