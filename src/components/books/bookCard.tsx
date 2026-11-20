"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

export default function BookCard({
  book,
  index = 0,
}: {
  book: Book;
  index?: number;
}) {
  const isAvailable = typeof book.totalCopies === "number" ? book.totalCopies > 0 : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white/95 p-3.5 sm:p-4 shadow-xs transition-shadow duration-300 hover:border-[#183b2b]/35 hover:shadow-xl hover:shadow-stone-900/5 dark:border-[#1e3d2c]/80 dark:bg-[#0e2218]/90 dark:hover:border-[#52b788]/40 dark:hover:shadow-black/40"
    >
      {/* 1. Curated Book Showcase Stage */}
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-stone-100/90 via-stone-50/70 to-white/40 p-4 sm:p-5 dark:from-[#142d20]/70 dark:via-[#0e2218]/60 dark:to-transparent">
        {/* Category Pill floating at top left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-[#183b2b] shadow-2xs backdrop-blur-xs border border-stone-200/60 dark:bg-[#12281d]/95 dark:text-[#86d39e] dark:border-white/10">
            {book.category}
          </span>
        </div>

        {/* Availability Badge floating at top right */}
        {typeof book.totalCopies === "number" && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-xs shadow-2xs border ${
                isAvailable
                  ? "bg-emerald-50/95 text-emerald-800 border-emerald-200/80 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/50"
                  : "bg-amber-50/95 text-amber-800 border-amber-200/80 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/50"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isAvailable ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              {isAvailable ? `${book.totalCopies} copies` : "Unavailable"}
            </span>
          </div>
        )}

        {/* Ambient background glow matching book colors */}
        {book.image && (
          <div
            className="pointer-events-none absolute inset-0 scale-150 bg-cover bg-center opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30 dark:opacity-25 dark:group-hover:opacity-35"
            style={{ backgroundImage: `url(${book.image})` }}
            aria-hidden="true"
          />
        )}

        {/* Physical Book Cover with 3D depth and realistic proportions */}
        <div className="relative z-1 flex items-center justify-center py-1">
          <div className="relative aspect-[2/3] w-28 sm:w-32 md:w-36 overflow-hidden rounded-r-md rounded-l-xs shadow-md shadow-stone-900/20 ring-1 ring-black/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-stone-900/35 dark:ring-white/10 dark:shadow-black/60">
            {/* Realistic spine shading & highlight */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2.5 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[1px] bg-white/40" />

            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-stone-200 p-3 text-center text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                <BookOpen className="h-7 w-7 text-stone-400 dark:text-stone-500" />
                <span className="text-[10px] font-medium leading-tight">No Cover</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Book Info and Actions */}
      <div className="flex flex-1 flex-col justify-between pt-3.5 sm:pt-4">
        <div>
          <h3
            className="font-serif text-base sm:text-lg font-bold leading-snug text-stone-900 line-clamp-1 transition-colors group-hover:text-[#183b2b] dark:text-stone-100 dark:group-hover:text-[#86d39e]"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-stone-500 line-clamp-1 dark:text-stone-400">
            by <span className="text-stone-700 dark:text-stone-300">{book.author}</span>
          </p>

          {(book.shortDescription || book.description) && (
            <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2 dark:text-stone-400/90">
              {book.shortDescription || book.description}
            </p>
          )}
        </div>

        {/* View Details Button with whileTap */}
        <div className="mt-4 pt-1">
          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}>
            <Link
              href={`/all-books/${book._id}`}
              className="group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#183b2b] px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-[#122e22] dark:bg-[#86d39e] dark:text-[#07170f] dark:hover:bg-[#72bf89]"
            >
              <span>View Details</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
