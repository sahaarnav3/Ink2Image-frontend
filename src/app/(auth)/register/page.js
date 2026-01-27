"use client";

import { useState } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaBookBookmark } from "react-icons/fa6";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { checkUserStatus } = useAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiBaseUrl}/api/auth/register`,
        formData,
        { withCredentials: true },
      );
      await checkUserStatus();
      toast.success("Account Created. Please Login To Continue!");
      router.push("/login");
    } catch (error) {
        // console.log("Error registering user: ", error.response.data.message);
        toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md px-6 border border-[1px] rounded-4xl py-5 border-gray-400/20 backdrop-blur-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      {/* Branding */}
      <div className="flex flex-col items-center mb-8 ">
        <div className="p-5 rounded-2xl">
          <FaBookBookmark className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" size={70} />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Ink2Image
        </h1>
        <p className="text-gray-300 text-lg mt-2 font-medium">Welcome back, Reader.</p>
      </div>

      {/* Form Card */}
      <div className="w-full px-5 pb-5">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="Arnav Saha"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="arnav_dev"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="name@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-400 ml-1 inline-block mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/30 transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button className="w-full bg-white text-black font-extrabold py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] mt-4">
            Begin Journey
          </button>
        </form>

        <div className="mt-4 mb-2 text-center">
          <p className="text-gray-400">
            Already a member?{"  "}
            <Link
              href="/login"
              className="text-blue-500 font-bold hover:underline underline-offset-3"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}