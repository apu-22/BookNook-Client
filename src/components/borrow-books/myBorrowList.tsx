"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, CheckCircle2, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getClientToken } from "@/lib/getClientToken";

export interface BorrowItem {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage?: string;
  userEmail: string;
  userName?: string;
  borrowDate: string;
  returnDate: string;
}

export default function MyBorrowList({ borrows }: { borrows: BorrowItem[] }) {
  const router = useRouter();
  const [returningId, setReturningId] = useState<string | null>(null);

  const handleReturnBook = async (borrow: BorrowItem) => {
    setReturningId(borrow._id);

    const jwtToken = await getClientToken();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const token = typeof jwtToken === "object" && jwtToken !== null ? jwtToken.token : jwtToken;
      const res = await fetch(`${apiUrl}/my-borrows/${borrow._id}`, {
        method: "DELETE",
        headers:{
          authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.add({
          title: "Book Returned Successfully!",
          description: `"${borrow.bookTitle}" has been returned to the library.`,
          type: "success",
        });
        router.refresh();
      } else {
        toast.add({
          title: "Failed to Return",
          description: data?.message || "Could not process return request.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.add({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setReturningId(null);
    }
  };

  if (!borrows || borrows.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-stone-200 bg-white/50 p-12 text-center dark:border-stone-800/80 dark:bg-[#0e2218]/40">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
          <BookOpen className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
          No borrowed books
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          You haven&apos;t borrowed any books from the library yet.
        </p>
        <div className="mt-6">
          <Link
            href="/all-books"
            className="inline-flex items-center justify-center rounded-lg bg-[#183b2b] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
          >
            Browse Books
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
                Borrow Date
              </th>
              <th scope="col" className="py-3.5 px-4">
                Return Date
              </th>
              <th scope="col" className="py-3.5 pl-4 pr-4 sm:pr-6 text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800/60">
            {borrows.map((borrow) => {
              const isReturning = returningId === borrow._id;

              return (
                <tr
                  key={borrow._id}
                  className="group transition-colors hover:bg-stone-50/80 dark:hover:bg-[#122b1f]/40"
                >
                  {/* 1. Book Thumbnail & Title */}
                  <td className="py-3.5 pl-4 sm:pl-6 pr-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-10 sm:h-16 sm:w-11 shrink-0 overflow-hidden rounded-md border border-stone-200/90 bg-stone-100 shadow-2xs dark:border-stone-800 dark:bg-[#142e22]">
                        {borrow.bookImage ? (
                          <img
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
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
                          href={`/all-books/${borrow.bookId}`}
                          className="font-serif text-sm sm:text-base font-bold text-stone-900 transition-colors hover:text-[#183b2b] dark:text-stone-100 dark:hover:text-[#86d39e] line-clamp-1"
                          title={borrow.bookTitle}
                        >
                          {borrow.bookTitle}
                        </Link>
                        {/* Mobile Borrow Date */}
                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400 sm:hidden">
                          Borrowed: {borrow.borrowDate}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. Borrow Date */}
                  <td className="py-3.5 px-4 hidden sm:table-cell text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-stone-400" />
                      {borrow.borrowDate}
                    </span>
                  </td>

                  {/* 3. Return Date */}
                  <td className="py-3.5 px-4 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2 py-1 text-xs dark:bg-[#142e22] dark:text-[#86d39e]">
                      <Calendar className="h-3 w-3 text-stone-500 dark:text-[#86d39e]" />
                      {borrow.returnDate}
                    </span>
                  </td>

                  {/* 4. Return Book Action */}
                  <td className="py-3.5 pl-4 pr-4 sm:pr-6 text-right">
                    <Button
                      type="button"
                      disabled={isReturning}
                      onClick={() => handleReturnBook(borrow)}
                      className="h-8 gap-1 rounded-md bg-[#183b2b] px-3 text-xs font-medium text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89] cursor-pointer"
                    >
                      {isReturning ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Returning...</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Return Book</span>
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
