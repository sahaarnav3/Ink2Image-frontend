import LibraryHeader from "@/components/LibraryHeader";;
import BookCard from "@/components/BookCard";

export default function Dashboard() {

  const books = [
    { id: 1, title: "The Obsidian Gate", status: "Completed", pageCount: 24, date: "Jan 28, 2026", coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800" },
    { id: 2, title: "Amber Echoes", status: "Drafts", pageCount: 12, date: "Feb 01, 2026", coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800" },
    { id: 3, title: "Neon Frontiers", status: "Completed", pageCount: 42, date: "Jan 15, 2026", coverImage: "https://images.unsplash.com/photo-1762219215193-8d22bc485abc?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "The Silent Forest", status: "Completed", pageCount: 8, date: "Jan 02, 2026", coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
  ];
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* The Unified Container */}
      <div className="flex-1 flex flex-col bg-black/40 backdrop-blur-2xl border border-amber-600/30 rounded-2xl overflow-auto shadow-2xl">
        
        {/* 1. Header (Remove its own bg/border in the component or keep it clean here) */}
        <div className="border-b border-white/5">
           <LibraryHeader /> 
        </div>

        {/* 2. Scrollable/Padding area for the Grid */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
