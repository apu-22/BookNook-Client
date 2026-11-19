"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Calendar,
  BookPlus,
  BookOpen,
  Clock,
  ArrowRight,
  ShieldCheck,
  Camera,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [addedBooksCount, setAddedBooksCount] = useState(0);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
  const [pendingReturnCount, setPendingReturnCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    Promise.all([
      fetch(`${apiUrl}/my-books?email=${encodeURIComponent(user.email)}`).then(
        (res) => (res.ok ? res.json() : [])
      ),
      fetch(`${apiUrl}/my-borrows?email=${encodeURIComponent(user.email)}`).then(
        (res) => (res.ok ? res.json() : [])
      ),
    ])
      .then(([books, borrows]) => {
        const booksList = Array.isArray(books) ? books : [];
        const borrowList = Array.isArray(borrows) ? borrows : [];

        setAddedBooksCount(booksList.length);
        setBorrowedBooksCount(borrowList.length);
        setPendingReturnCount(borrowList.length);
      })
      .catch((error) => {
        console.error("Error fetching user stats:", error);
      })
      .finally(() => {
        setLoadingStats(false);
      });
  }, [user?.email]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  // While session is loading or validating via proxy
  if (isPending || !user) {
    return (
      <main className="min-h-screen bg-[#fcfbf7] dark:bg-[#07170f] py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  // User logged in state (guaranteed by proxy.ts)
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Active Member";

  return (
    <main className="min-h-screen bg-[#fcfbf7] dark:bg-[#07170f] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Basic Information Card */}
        <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-[#1e3d2c] dark:bg-[#0f241a]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* Avatar with hover camera icon */}
            <div className="relative group cursor-pointer" title="Profile picture">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-[#183b2b]/20 shadow-xs dark:border-[#86d39e]/30 transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src={user.image || ""} alt={user.name} className="object-cover" />
                <AvatarFallback className="bg-[#183b2b] text-xl sm:text-2xl font-bold text-white dark:bg-[#86d39e] dark:text-[#07170f]">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                <Camera className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                    {user.name}
                  </h1>
                  <div className="mt-1 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    <Mail className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                    <span>{user.email}</span>
                  </div>
                </div>

                {/* Status Badge & Better Auth Sign Out Button */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 self-center sm:self-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#183b2b]/10 px-3 py-1 text-xs font-semibold text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Community Reader
                  </span>

                  <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    size="sm"
                    className="h-8 cursor-pointer flex items-center gap-1.5 rounded-xl text-xs"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>

              {/* Extra Info */}
              <div className="mt-4 pt-4 border-t border-stone-100 dark:border-[#1e3d2c] flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>Joined: {joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section: Added Books, Borrowed Books, Pending Return */}
        <div>
          <div className="mb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              Library Activity
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              A quick overview of your contributions and reading journey in BookNook.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {/* Stat 1: Books Added */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:shadow-md dark:border-[#1e3d2c] dark:bg-[#0f241a]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Books Added
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#183b2b]/10 text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
                    <BookPlus className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  {loadingStats ? "..." : addedBooksCount}
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Books shared with the community
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-[#1e3d2c]">
                <Link
                  href="/my-books"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#183b2b] hover:underline dark:text-[#86d39e]"
                >
                  <span>View My Books</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stat 2: Books Borrowed */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:shadow-md dark:border-[#1e3d2c] dark:bg-[#0f241a]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Books Borrowed
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  {loadingStats ? "..." : borrowedBooksCount}
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Total active borrowed books
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-[#1e3d2c]">
                <Link
                  href="/my-borrows"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  <span>View My Borrows</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stat 3: Pending Return */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:shadow-md dark:border-[#1e3d2c] dark:bg-[#0f241a]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Pending Return
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  {loadingStats ? "..." : pendingReturnCount}
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Books currently due for return
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-[#1e3d2c]">
                <Link
                  href="/my-borrows"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
                >
                  <span>Manage Returns</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-5 sm:p-6 dark:border-[#1e3d2c] dark:bg-[#0f241a]/60">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Quick Actions
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/add-book"
              className="inline-flex items-center gap-2 rounded-xl bg-[#183b2b] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
            >
              <BookPlus className="h-4 w-4" />
              <span>Add a New Book</span>
            </Link>

            <Link
              href="/all-books"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs hover:bg-stone-50 transition-colors dark:border-[#1e3d2c] dark:bg-[#07170f] dark:text-stone-200 dark:hover:bg-[#0f241a]"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse Library</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 dark:border-[#1e3d2c] dark:bg-[#0f241a]">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-stone-200 dark:bg-[#142e20]" />
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="h-7 w-48 rounded bg-stone-200 dark:bg-[#142e20] mx-auto sm:mx-0" />
            <div className="h-4 w-36 rounded bg-stone-200 dark:bg-[#142e20] mx-auto sm:mx-0" />
            <div className="h-4 w-28 rounded bg-stone-200 dark:bg-[#142e20] mx-auto sm:mx-0" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-[#1e3d2c] dark:bg-[#0f241a] space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded bg-stone-200 dark:bg-[#142e20]" />
              <div className="h-10 w-10 rounded-xl bg-stone-200 dark:bg-[#142e20]" />
            </div>
            <div className="h-9 w-16 rounded bg-stone-200 dark:bg-[#142e20]" />
            <div className="h-3 w-32 rounded bg-stone-200 dark:bg-[#142e20]" />
          </div>
        ))}
      </div>
    </div>
  );
}
