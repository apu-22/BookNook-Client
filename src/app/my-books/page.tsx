import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import MyBookList, { BookItem } from "@/components/books/myBookList";
import { getServerToken } from "@/lib/getServerToken";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage your published books in the BookNook community library",
};

async function UserBooksData() {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return (
      <div className="mt-12 rounded-2xl border border-stone-200 bg-white/70 p-10 text-center dark:border-stone-800/80 dark:bg-[#0e2218]/50">
        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
          Sign In Required
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Please sign in to view and manage the books you added to the library.
        </p>
        <div className="mt-6">
          <Link
            href="/sign-in?redirect=/my-books"
            className="inline-flex items-center justify-center rounded-lg bg-[#183b2b] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  let books: BookItem[] = [];
  const jwtToken = await getServerToken();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(
      `${apiUrl}/my-books?email=${encodeURIComponent(session?.user?.email)}`,
      {
        cache: "no-store",
        headers:{
          authorization: `Bearer ${jwtToken?.token}`,
        }
      }
    );

    if (res.ok) {
      books = await res.json();
    }
  } catch (error) {
    console.error("Error fetching user books:", error);
    return (
      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/20">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          Failed to load your books. Please ensure the backend server is running.
        </p>
      </div>
    );
  }

  return <MyBookList books={books} />;
}


function MyBooksSkeleton() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white/50 p-6 dark:border-stone-800 dark:bg-[#0b1b13]/50 animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-stone-100 dark:border-stone-800/60">
            <div className="flex items-center gap-3">
              <div className="h-14 w-10 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
            </div>
            <div className="h-4 w-16 rounded bg-stone-200 dark:bg-stone-800 hidden sm:block" />
            <div className="h-4 w-8 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-7 w-24 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyBooksPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            My Books
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Books you added to the library.
          </p>
        </div>

        {/* Dynamic Book List Table */}
        <Suspense fallback={<MyBooksSkeleton />}>
          <UserBooksData />
        </Suspense>
      </div>
    </div>
  );
}