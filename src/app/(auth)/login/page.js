"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaBookBookmark } from "react-icons/fa6";
import axios from "axios";
const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkUserStatus } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiBaseUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      await checkUserStatus();
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-25 justify-center w-full max-w-md px-6 border border-[1px] border rounded-4xl py-5 border-gray-400/20 backdrop-blur-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      {/* Branding */}
      <div className="flex flex-col items-center mb-10 ">
        <div className="p-5 rounded-2xl">
          <FaBookBookmark className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" size={70} />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Ink2Image
        </h1>
        <p className="text-gray-300 text-lg mt-2 font-medium">Welcome back, Reader.</p>
      </div>

      {/* Form Card */}
      <div className="w-full px-5 py-4">
        <form onSubmit={handleLogin} className="space-y-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-white text-black font-extrabold py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] mt-5">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white-500">
            Dont have an account?{"  "}
            <Link
              href="/register"
              className="text-blue-500 font-bold hover:underline underline-offset-3"
            >
              Join the guild
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
