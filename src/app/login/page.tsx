"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black" dir="rtl">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 border border-gray-300 rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <label className="block mb-4">
          البريد الإلكتروني
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-6">
          كلمة المرور
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
        <p className="mt-4 text-center">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </form>
    </main>
  );
}
