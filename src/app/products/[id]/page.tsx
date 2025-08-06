"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">جارٍ التحميل...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">المنتج غير موجود.</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <main className="min-h-screen p-8 bg-white text-black" dir="rtl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <span className="text-2xl font-semibold mb-6">{product.price} EGP</span>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </main>
  );
}
