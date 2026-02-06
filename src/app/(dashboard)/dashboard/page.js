"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LibraryHeader from "@/components/LibraryHeader";
import BookCard from "@/components/BookCard";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Recent First");

  // const books = [
  //   { id: 1, title: "The Obsidian Gate", status: "Completed", pageCount: 24, date: "Jan 28, 2026", coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800" },
  //   { id: 2, title: "Amber Echoes", status: "Drafts", pageCount: 12, date: "Feb 01, 2026", coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800" },
  //   { id: 3, title: "Neon Frontiers", status: "Completed", pageCount: 42, date: "Jan 15, 2026", coverImage: "https://images.unsplash.com/photo-1762219215193-8d22bc485abc?auto=format&fit=crop&q=80&w=800" },
  //   { id: 4, title: "The Silent Forest", status: "Processing", pageCount: 8, date: "Jan 02, 2026", coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
  // ];

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/api/books/my-library`, {
          withCredentials: true,
        });
        // console.log("bookdat", data);
        const formattedBooks = data.map((item) => ({
          id: item.bookId?._id,
          title: item.bookId?.title,
          status: item.bookId?.status,
          pageCount: item.bookId?.totalPages || 0,
          date: new Date(item.addedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          coverImage:
            item.bookId?.coverImage ||
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800",
        }));
        setBooks(formattedBooks);
        setFilteredBooks(formattedBooks);
      } catch (error) {
        console.log("Book Fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  // 🔍 Client-side Search and Filter Logic
  useEffect(() => {
    setFilteredBooks(
      books
        .filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort((a, b) => {
          if (filter === "Oldest First")
            return new Date(a.date) - new Date(b.date);
          if (filter === "Recent First")
            return new Date(b.date) - new Date(a.date);
        }),
    );
  }, [searchQuery, filter]);

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* The Unified Container */}
      <div className="flex-1 flex flex-col bg-black/40 backdrop-blur-2xl border border-amber-600/30 rounded-2xl overflow-auto shadow-2xl">
        {/* 1. Header (Remove its own bg/border in the component or keep it clean here) */}
        <div className="border-b border-white/5">
          <LibraryHeader
            setSearchQuery={setSearchQuery}
            setFilter={setFilter}
            activeFilter={filter}
          />
        </div>

        {/* 2. Scrollable/Padding area for the Grid */}
        <div className="p-6 flex-1">
          {loading ? (
            /* 🌀 Simple Loading State */
            <div className="flex items-center justify-center h-64 text-amber-500 font-bold animate-pulse">
              Opening your library...
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            /* 📭 Empty State */
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg">No stories found in this world.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
