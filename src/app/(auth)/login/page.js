"use client";

import { useState } from "react";
import { toast } from "sonner";
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
      toast.success("Welcome back, Reader!");
      router.push("/dashboard");
    } catch (error) {
      //   console.log("Error registering user: ", error.response.data.message);
      toast.error(error.response?.data?.message || "Something Went Wrong !");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[95%] sm:w-full max-w-md min-w-[300px] px-4 sm:px-6 border border-white/10 rounded-3xl sm:rounded-4xl py-6 sm:py-8 backdrop-blur-xl shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {/* Branding */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="p-3 sm:p-5 rounded-2xl">
          <FaBookBookmark
            className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            size={70}
          />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Ink2Image
        </h1>
        <p className="text-gray-300 text-lg mt-2 font-medium">
          Welcome back, Reader.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full px-2 sm:px-5 pb-2 sm:pb-5">
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-400 ml-1 inline-block">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white outline-none focus:border-white/30 transition-all text-sm sm:text-base"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-400 ml-1 inline-block">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white outline-none focus:border-white/30 transition-all text-sm sm:text-base"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-white text-black font-extrabold py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] mt-4 sm:mt-5 text-sm sm:text-base">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            Don{"'"}t have an account?{"  "}
            <Link
              href="/register"
              className="text-blue-500 font-bold hover:underline underline-offset-4"
            >
              Join the guild
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
