"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const checkUserStatus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/me`, {
        withCredentials: true,
      });
      // console.log("auth provider response", response);
      setUser(response.data);
    } catch (error) {
      // console.log("cookies fetching error:", error.response.data.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.status == 200) {
        setUser(null);
        toast.success("Safe travels, Reader!");
        router.push("/login");
      } else {
        toast.error("Some error occurred. Please refresh page and try again!");
      }
    } catch (error) {
      console.log("Logout User error:", error);
      toast.error("Some error occurred. Please refresh page and try again!");
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, checkUserStatus, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
