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
  const descriptionText =
    book.description || book.shortDescription || "No description available for this book.";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:shadow-md dark:border-[#1e3d2c] dark:bg-[#0f241a] dark:hover:border-[#52b788]/40">
      {/* 1. Book Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 dark:bg-[#12281d]">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-stone-400 dark:text-stone-600">
            <BookOpen className="h-10 w-10" />
            <span className="text-[11px]">No Cover</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3.5">
        {/* 2. Category Badge */}
        <div className="mb-2">
          <span className="inline-block rounded-full bg-[#183b2b]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
            {book.category}
          </span>
        </div>

        {/* 3. Book Title */}
        <h3
          className="font-serif text-sm sm:text-base font-bold text-stone-900 line-clamp-1 transition-colors group-hover:text-[#183b2b] dark:text-stone-100 dark:group-hover:text-[#86d39e]"
          title={book.title}
        >
          {book.title}
        </h3>

        {/* 4. Author Name */}
        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
          by {book.author}
        </p>

        {/* 5. Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
          {descriptionText}
        </p>

        {/* 6. View Details Button */}
        <div className="mt-auto pt-3">
          <Link
            href={`/all-books/${book._id}`}
            className="block w-full rounded-lg bg-[#183b2b] py-2 text-center text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#122e22] active:scale-[0.99] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
