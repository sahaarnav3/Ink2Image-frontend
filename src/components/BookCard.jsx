import { FaBookOpen, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export default function BookCard({ book }) {
  return (
    /* flex-row for mobile, flex-col for desktop */
    <div className="group relative w-full bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-amber-500/60 hover:shadow-amber-500/50 shadow-xl flex flex-row md:flex-col h-36 md:h-auto">
      
      {/* Image Container: Fixed width on mobile, aspect-ratio on desktop */}
      <div className="relative w-28 sm:w-44 md:w-full md:aspect-[2/3] overflow-hidden flex-shrink-0">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
        />

        {/* Top-Down Gradient for Status Badge readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

        {/* Status Badge: Top-left for mobile row, Top-right for desktop */}
        <div className="absolute top-2 left-2 md:top-3 md:right-3 md:left-auto px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[7px] md:text-[8px] font-black text-amber-500 uppercase tracking-tighter">
          {book.status}
        </div>

        {/* Gradient Overlay: Only visible on desktop where text is overlaid */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 pb-2 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
          <h3 className="text-base font-bold text-white truncate mb-1.5 group-hover:text-amber-400 transition-colors">
            {book.title}
          </h3>
          <div className="flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-widest font-black">
            <span className="flex items-center gap-1.5">
              <FaBookOpen className="text-amber-500/60" /> {book.pageCount} Pages
            </span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-amber-500/60" /> {book.date}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Content & Button Section */}
      <div className="flex-1 flex flex-col justify-between p-3 md:p-0 bg-neutral-950/20 md:bg-transparent">
        
        {/* Mobile-Only Title Section: Shown next to image */}
        <div className="md:hidden">
          <h3 className="text-base font-bold text-white truncate mb-2">
            {book.title}
          </h3>
          {/* Metadata stacked in a column for mobile */}
          <div className="flex flex-col gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest font-black">
            <span className="flex items-center gap-2">
              <FaBookOpen className="text-amber-500/60 w-3" /> {book.pageCount} Pages
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-amber-500/60 w-3" /> {book.date}
            </span>
          </div>
        </div>

        {/* Button Section: Stays at the bottom */}
        <div className="p-0 md:p-3 md:bg-black md:border-t md:border-white/5">
          <button className="relative w-full py-2.5 md:py-3 bg-amber-500/15 hover:bg-amber-500/30 rounded-xl flex items-center justify-center gap-2 md:gap-3 text-amber-500 font-bold text-[10px] md:text-xs uppercase tracking-widest active:scale-[0.98] active:bg-amber-500 active:text-black transition-all group/btn overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-transform" />
            
            <span className="relative z-10">Read Journey</span>
            <FaArrowRight className="relative z-10 text-[8px] md:text-[10px] group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}