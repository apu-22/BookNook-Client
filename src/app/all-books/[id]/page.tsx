import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

interface Book {
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
  addedAt?: string;
}

async function BookDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  let book: Book | null = null;

  try {
    const res = await fetch(`http://localhost:8000/all-books/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      book = await res.json();
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
  }

  if (!book) {
    return (
      <div className="py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
          Book Not Found
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          The book you are looking for does not exist or could not be loaded.
        </p>
        <div className="mt-6">
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 rounded-lg bg-[#183b2b] px-4 py-2 text-sm font-medium text-white hover:bg-[#122e22] dark:bg-[#86d39e] dark:text-[#0a1e14]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all books
          </Link>
        </div>
      </div>
    );
  }

  const description =
    book.description || book.shortDescription || "No description available for this book.";

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 items-start">
      {/* Left Column: Compact Book Cover Image */}
      <div className="md:col-span-4 lg:col-span-4 flex justify-center md:justify-start">
        <div className="w-full max-w-[240px] sm:max-w-[270px] overflow-hidden rounded-xl border border-stone-200/90 bg-stone-100 shadow-md dark:border-stone-800 dark:bg-[#12281d]">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover aspect-[2/3]"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-2 text-stone-400 dark:text-stone-600">
              <BookOpen className="h-12 w-12" />
              <span className="text-xs font-medium">No Cover Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Book Details */}
      <div className="md:col-span-8 lg:col-span-8 flex flex-col items-start text-left">
        {/* Category Badge */}
        <div>
          <span className="inline-block rounded-full bg-stone-200/90 px-3 py-1 text-xs font-semibold text-stone-800 dark:bg-[#1e3d2c]/80 dark:text-[#86d39e] border border-stone-300/60 dark:border-[#2d5c43]/40">
            {book.category}
          </span>
        </div>

        {/* Book Title */}
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white leading-[1.15]">
          {book.title}
        </h1>

        {/* Author Name */}
        <p className="mt-2 text-sm sm:text-base text-stone-500 dark:text-stone-400 font-medium">
          by {book.author}
        </p>

        {/* Short Description */}
        <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 max-w-xl">
          {description}
        </p>

        {/* Info Box: Added by & Copies left */}
        <div className="mt-8 w-full max-w-xl rounded-xl border border-stone-200/90 bg-white/80 p-4 sm:p-5 shadow-xs dark:border-stone-800/80 dark:bg-[#0e2218]/70 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">
              Added by
            </span>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-200 mt-1">
              {book.userName || "Anonymous Reader"}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {book.userEmail || "No email available"}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">
              Copies left
            </span>
            <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              {book.totalCopies ?? 1}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center gap-5">
          <button
            type="button"
            className="rounded-lg bg-[#183b2b] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#122e22] active:scale-[0.98] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89] cursor-pointer"
          >
            Borrow This Book
          </button>

          <Link
            href="/all-books"
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
          >
            Back to all books
          </Link>
        </div>
      </div>
    </div>
  );
}

function BookDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 animate-pulse items-start">
      <div className="md:col-span-4 flex justify-center md:justify-start">
        <div className="w-full max-w-[240px] sm:max-w-[270px] aspect-[2/3] rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="md:col-span-8 flex flex-col items-start w-full">
        <div className="h-5 w-16 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="mt-3 h-9 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="mt-2 h-4 w-1/3 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="mt-5 h-16 w-full max-w-xl rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="mt-7 h-16 w-full max-w-xl rounded-xl bg-stone-200 dark:bg-stone-800" />
        <div className="mt-7 flex gap-4">
          <div className="h-9 w-32 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="h-9 w-24 rounded-lg bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  );
}

export default function BookDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<BookDetailsSkeleton />}>
          <BookDetailsContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
