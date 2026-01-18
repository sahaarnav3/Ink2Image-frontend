import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ink2Image",
  description: "A more interactive way to read your books.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex`}
      >
        <Sidebar />
        {/* The Main Content area shifts to the right by 80px (w-20) */}
        <main className="flex-1 ml-80 min-h-screen bg-[#0a0a0a]">
          {children}
        </main>
      </body>
    </html>
  );
}
