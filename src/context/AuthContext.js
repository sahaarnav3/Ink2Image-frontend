"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  const checkUserStatus = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const response = await axios.get(`${baseUrl}/api/auth/me`, {
        withCredentials: true,
      });
      // console.log("auth provider response", response);
      setUser(response.data);
    } catch (error) {
      //   console.log("cookies fetching error:", error.response.data.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
