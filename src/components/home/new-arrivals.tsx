import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard, { Book } from "@/components/books/bookCard";
import { FadeIn, ScaleOnHover } from "@/components/common/animations";

async function NewArrivalsList() {
  await connection();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiUrl}/new-arrivals`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch new arrivals");
    }

    const result = await res.json();
    const books: Book[] = Array.isArray(result) ? result : result?.data || [];

    if (books.length === 0) {
      return (
        <div className="py-12 text-center">
          <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400">
            No new books added recently.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {books.map((book, index) => (
          <BookCard key={book._id} book={book} index={index} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading new arrivals:", error);
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/20">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          Failed to load new arrivals. Please try again later.
        </p>
      </div>
    );
  }
}

function NewArrivalsSkeleton() {
  return (
    <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-3 dark:border-[#1e3d2c] dark:bg-[#0f241a] animate-pulse"
        >
          <div className="h-52 w-full rounded-xl bg-stone-200 dark:bg-[#12281d]" />
          <div className="mt-3 h-4 w-16 rounded bg-stone-200 dark:bg-[#12281d]" />
          <div className="mt-2 h-5 w-3/4 rounded bg-stone-200 dark:bg-[#12281d]" />
          <div className="mt-1 h-3.5 w-1/2 rounded bg-stone-200 dark:bg-[#12281d]" />
          <div className="mt-4 h-8 w-full rounded bg-stone-200 dark:bg-[#12281d]" />
        </div>
      ))}
    </div>
  );
}

export default function NewArrivalsBook() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-50/50 dark:bg-[#0a1e14]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with FadeIn */}
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            New Arrivals
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            The latest books added by our readers.
          </p>
        </FadeIn>

        {/* Dynamic Books Grid */}
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivalsList />
        </Suspense>

        {/* See All Books Button with Hover Scale */}
        <FadeIn delay={0.2} className="mt-10 sm:mt-12 flex justify-center">
          <ScaleOnHover>
            <Link
              href="/all-books"
              className="inline-flex items-center gap-2 rounded-xl bg-[#183b2b] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#122e22] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
            >
              <span>See All Books</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScaleOnHover>
        </FadeIn>
      </div>
    </section>
  );
}
