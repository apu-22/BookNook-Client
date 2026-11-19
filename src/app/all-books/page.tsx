import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { BookOpen, PlusCircle, Sparkles } from "lucide-react";
import { Book } from "@/components/books/bookCard";
import AllBooksCatalog from "@/components/books/allBooksCatalog";

export const metadata: Metadata = {
  title: "All Books",
  description: "Browse all available community books on BookNook",
};

async function BooksList() {
  await connection();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/all-books`, {
      cache: "no-store",
    });
    const result = await res.json();
    const books: Book[] = result?.data || [];

    if (books.length === 0) {
      return (
        <div className="my-16 rounded-3xl border border-stone-200/80 bg-white/70 p-12 text-center dark:border-stone-800 dark:bg-[#0e2218]/40">
          <BookOpen className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-3" />
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            No Books on the Shelf Yet
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            Be the first community member to contribute a book to the library!
          </p>
          <div className="mt-6">
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 rounded-xl bg-[#183b2b] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] dark:bg-[#86d39e] dark:text-[#07170f] dark:hover:bg-[#72bf89]"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add a Book</span>
            </Link>
          </div>
        </div>
      );
    }

    return <AllBooksCatalog books={books} />;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          Failed to load books. Please ensure your backend server is active and reachable.
        </p>
      </div>
    );
  }
}

function BooksLoadingSkeleton() {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      {/* Search Bar Skeleton */}
      <div className="h-28 w-full rounded-2xl border border-stone-200/60 bg-stone-100/70 dark:border-stone-800 dark:bg-stone-900/40" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-4 dark:border-stone-800 dark:bg-[#0e2218]/50"
          >
            {/* Cover Skeleton */}
            <div className="flex h-56 w-full items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800/60">
              <div className="h-40 w-28 rounded-md bg-stone-200 dark:bg-stone-700/60" />
            </div>
            {/* Meta Skeleton */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
              <div className="mt-4 h-9 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllBooks() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200/80 pb-6 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#183b2b]/10 px-3 py-1 text-xs font-semibold text-[#183b2b] dark:bg-[#86d39e]/15 dark:text-[#86d39e] mb-2.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Community Library</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
              All Books
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Browse, search, and discover books shared by fellow readers in the community.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-[#183b2b] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] active:scale-[0.98] transition-all dark:bg-[#86d39e] dark:text-[#07170f] dark:hover:bg-[#72bf89]"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add a Book</span>
          </Link>
        </div>

        {/* Dynamic Book Catalog */}
        <Suspense fallback={<BooksLoadingSkeleton />}>
          <BooksList />
        </Suspense>
      </div>
    </div>
  );
}
