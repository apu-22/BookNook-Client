import Link from "next/link";
import { BookOpen } from "lucide-react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies?: number;
  image?: string;
  description?: string;
  shortDescription?: string;
  userName?: string;
  userEmail?: string;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:shadow-md dark:border-[#1e3d2c] dark:bg-[#0f241a] dark:hover:border-[#52b788]/40">
      {/* 1. Compact Image with fixed proportional height */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100 dark:bg-[#12281d]">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-stone-400 dark:text-stone-600">
            <BookOpen className="h-9 w-9" />
            <span className="text-xs font-medium">No Cover Available</span>
          </div>
        )}
      </div>

      {/* Card Body: Category, Title, Author & Button */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* 2. Category */}
        <div className="mb-2">
          <span className="inline-block rounded-full bg-[#183b2b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
            {book.category}
          </span>
        </div>

        {/* 3. Title */}
        <h3
          className="font-serif text-base sm:text-lg font-bold text-stone-900 line-clamp-1 transition-colors group-hover:text-[#183b2b] dark:text-stone-100 dark:group-hover:text-[#86d39e]"
          title={book.title}
        >
          {book.title}
        </h3>

        {/* 4. Author */}
        <p className="mt-0.5 text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 line-clamp-1">
          by {book.author}
        </p>

        {/* 5. View Details Button */}
        <div className="mt-5 pt-1">
          <Link
            href={`/all-books/${book._id}`}
            className="flex w-full items-center justify-center rounded-lg bg-[#183b2b] py-2 text-center text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#122e22] active:scale-[0.99] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
