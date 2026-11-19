import type { Metadata } from "next";
import Link from "next/link";
import { BookX, Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center p-6 bg-[#fcfbf7] dark:bg-[#07170f] text-stone-900 dark:text-stone-100">
      <div className="max-w-md w-full text-center">
        {/* Badge / Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#183b2b]/10 text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e] shadow-xs">
          <BookX className="h-10 w-10" />
        </div>

        {/* 404 Display */}
        <p className="mt-6 font-serif text-6xl sm:text-7xl font-bold tracking-tight text-[#183b2b] dark:text-[#86d39e]">
          404
        </p>

        {/* Title & Description */}
        <h1 className="mt-3 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Page Not Found
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          The page or book you are looking for doesn&apos;t exist, has been removed, or was returned to a different shelf.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#183b2b] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] active:scale-[0.98] transition-all dark:bg-[#86d39e] dark:text-[#07170f] dark:hover:bg-[#72bf89]"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/all-books"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 active:scale-[0.98] transition-all dark:border-stone-700 dark:bg-[#12281d] dark:text-stone-300 dark:hover:bg-[#183b2b]/40"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse All Books</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
