import { Suspense } from "react";
import BookCard, { Book } from "@/components/books/bookCard";

async function BooksList() {
  try {
    const res = await fetch("http://localhost:8000/all-books", {
      cache: "no-store",
    });
    const result = await res.json();
    const books: Book[] = result?.data || [];

    if (books.length === 0) {
      return (
        <div className="py-16 text-center">
          <p className="text-base text-stone-500 dark:text-stone-400">
            No books found on the shelf yet. Be the first to add one!
          </p>
        </div>
      );
    }

    return (
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/20 mt-8">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          Failed to load books. Please ensure your backend server is running on port 8000.
        </p>
      </div>
    );
  }
}

function BooksLoadingSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-[#0f241a] animate-pulse"
        >
          <div className="aspect-[3/4] w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="mt-3 h-4 w-16 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="mt-2 h-5 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="mt-1 h-3 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="mt-3 h-8 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
        </div>
      ))}
    </div>
  );
}

export default function AllBooks() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-stone-200/80 pb-5 dark:border-stone-800">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
              All Books
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              Browse and discover books shared by fellow readers in the community.
            </p>
          </div>
        </div>

        {/* Dynamic Book Grid */}
        <Suspense fallback={<BooksLoadingSkeleton />}>
          <BooksList />
        </Suspense>
      </div>
    </div>
  );
}
