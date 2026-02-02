import { FaBookOpen, FaCalendarAlt, FaPlay } from "react-icons/fa";

export default function BookCard({ book }) {
  return (
    <div className="group relative aspect-2/3 w-full bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-amber-500/50 shadow-2xl">
      {/* 1. Background Image */}
      <img 
        src={book.coverImage} 
        alt={book.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* 2. Static Bottom Info (Visible by default) */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-10">
        <h3 className="text-lg font-bold text-white truncate mb-2">{book.title}</h3>
        <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          <span className="flex items-center gap-1.5"><FaBookOpen className="text-amber-500/60" /> {book.pageCount} Pages</span>
          <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-amber-500/60" /> {book.date}</span>
        </div>
      </div>

      {/* 3. Hover Overlay (The Dark Blur + Center Button) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center rounded-2xl">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <button className="h-14 w-14 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-110 transition-transform active:scale-95 mb-3 mx-auto">
            <FaPlay className="ml-1" />
          </button>
          <p className="text-amber-500 font-bold text-sm uppercase tracking-tighter">Open Story</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black text-amber-500 uppercase">
        {book.status}
      </div>
    </div>
  );
}