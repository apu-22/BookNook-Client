"use client";

import { useState, useMemo } from "react";
import { Search, X, BookOpen, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookCard, { Book } from "./bookCard";

interface AllBooksCatalogProps {
  books: Book[];
}

export default function AllBooksCatalog({ books }: AllBooksCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dynamically compile categories from books data while preserving clean order
  const categories = useMemo(() => {
    const defaultCategories = ["All", "Fiction", "Science", "History", "Kids", "Others"];
    const foundCategories = new Set(books.map((b) => b.category).filter(Boolean));
    
    // Combine standard categories and any extra found categories
    const all = ["All"];
    foundCategories.forEach((cat) => {
      if (!all.includes(cat)) {
        all.push(cat);
      }
    });
    return all;
  }, [books]);

  // Filter books by search query and category
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchesSearch =
        !query ||
        book.title?.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white/70 p-4 sm:p-5 backdrop-blur-xs shadow-xs dark:border-stone-800 dark:bg-[#0e2218]/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title or author..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-stone-800 placeholder-stone-400 transition-colors focus:border-[#183b2b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#183b2b]/15 dark:border-stone-800 dark:bg-[#12281d]/80 dark:text-stone-200 dark:placeholder-stone-500 dark:focus:border-[#86d39e] dark:focus:bg-[#0e2218]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Book Counter */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium text-stone-500 dark:text-stone-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#183b2b] dark:bg-[#86d39e]" />
            <span>
              Showing <strong className="text-stone-900 dark:text-stone-100">{filteredBooks.length}</strong> of {books.length} books
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500 pr-1 shrink-0 font-medium text-[11px]">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-[#183b2b] text-white shadow-xs dark:bg-[#86d39e] dark:text-[#07170f] font-semibold"
                    : "border border-stone-200/90 bg-stone-50/70 text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-[#12281d]/60 dark:text-stone-300 dark:hover:bg-[#183b2b]/30"
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Book Grid or Empty State */}
      {filteredBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-12 rounded-2xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800 bg-white/40 dark:bg-[#0e2218]/30"
        >
          <BookOpen className="mx-auto h-12 w-12 text-stone-300 dark:text-stone-600 mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
            No matching books found
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {searchQuery
              ? `No books matching "${searchQuery}" in category "${selectedCategory}".`
              : `No books currently available in "${selectedCategory}".`}
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 dark:border-stone-700 dark:bg-[#12281d] dark:text-stone-300 dark:hover:bg-[#183b2b]/50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredBooks.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
