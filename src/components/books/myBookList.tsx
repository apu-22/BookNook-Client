"use client";

import Link from "next/link";
import { BookOpen, Trash2 } from "lucide-react";
import EditBookDialog from "./editBook";

export interface BookItem {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies?: number;
  image?: string;
  description?: string;
}

export default function MyBookList({ books }: { books: BookItem[] }) {
  if (!books || books.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-stone-200 bg-white/50 p-12 text-center dark:border-stone-800/80 dark:bg-[#0e2218]/40">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
          <BookOpen className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
          No books added yet
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          You haven&apos;t added any books to the community library yet.
        </p>
        <div className="mt-6">
          <Link
            href="/add-book"
            className="inline-flex items-center justify-center rounded-lg bg-[#183b2b] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
          >
            Add Your First Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-stone-200/80 bg-white/70 shadow-xs dark:border-stone-800/80 dark:bg-[#0b1b13]/60 backdrop-blur-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-stone-200/90 text-xs font-semibold tracking-wider text-stone-500 dark:border-stone-800/80 dark:text-stone-400">
              <th scope="col" className="py-3.5 pl-4 sm:pl-6 pr-4">
                Book
              </th>
              <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">
                Category
              </th>
              <th scope="col" className="py-3.5 px-4 text-center">
                Copies
              </th>
              <th scope="col" className="py-3.5 pl-4 pr-4 sm:pr-6 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800/60">
            {books.map((book) => (
              <tr
                key={book._id}
                className="group transition-colors hover:bg-stone-50/80 dark:hover:bg-[#122b1f]/40"
              >
                {/* 1. Book Thumbnail, Title, Author */}
                <td className="py-3.5 pl-4 sm:pl-6 pr-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-14 w-10 sm:h-16 sm:w-11 shrink-0 overflow-hidden rounded-md border border-stone-200/90 bg-stone-100 shadow-2xs dark:border-stone-800 dark:bg-[#142e22]">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-stone-400">
                          <BookOpen className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/all-books/${book._id}`}
                        className="font-serif text-sm sm:text-base font-bold text-stone-900 transition-colors hover:text-[#183b2b] dark:text-stone-100 dark:hover:text-[#86d39e] line-clamp-1"
                        title={book.title}
                      >
                        {book.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                        {book.author}
                      </p>
                      {/* Mobile Category Pill */}
                      <span className="mt-1 inline-block text-[11px] text-stone-500 dark:text-stone-400 sm:hidden">
                        {book.category}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. Category */}
                <td className="py-3.5 px-4 hidden sm:table-cell text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {book.category}
                </td>

                {/* 3. Copies */}
                <td className="py-3.5 px-4 text-center text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200">
                  {book.totalCopies ?? 1}
                </td>

                {/* 4. Actions: Edit and Delete Buttons */}
                <td className="py-3.5 pl-4 pr-4 sm:pr-6 text-right">
                  <div className="inline-flex items-center gap-2">
                    <EditBookDialog book={book} />
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md border border-red-300/80 bg-red-50/80 px-2.5 py-1 text-xs font-medium text-red-600 shadow-2xs hover:bg-red-100 hover:text-red-700 transition-colors dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
