"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { BookOpen, Calendar, Loader2, LogIn } from "lucide-react";
import { getClientToken } from "@/lib/getClientToken";

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

export default function BorrowBookDialog({ book }: { book: Book }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default dates: Today for borrow, +7 days for return
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [returnDate, setReturnDate] = useState(nextWeek);

  const copiesAvailable = (book.totalCopies ?? 1) > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.add({
        title: "Sign In Required",
        description: "Please sign in to your account to borrow a book.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const jwtToken = await getClientToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/borrow-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwtToken?.token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image || "",
          userName: user.name || "Reader",
          userEmail: user.email,
          borrowDate: today,
          returnDate: returnDate,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.add({
          title: "Book Borrowed Successfully!",
          description: `You borrowed "${book.title}". Please return by ${returnDate}.`,
          type: "success",
        });
        setOpen(false);
        router.refresh();
      } else {
        toast.add({
          title: "Failed to Borrow",
          description: data?.message || "Could not complete the borrow request.",
          type: "error",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.add({
        title: "Network Error",
        description: "Could not connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 1. Trigger Button on Details Page */}
      <DialogTrigger
        render={
          <Button
            type="button"
            disabled={!copiesAvailable}
            className="rounded-lg bg-[#183b2b] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#122e22] active:scale-[0.98] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {copiesAvailable ? "Borrow This Book" : "Out of Stock"}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-[#0c1f15] dark:text-stone-100">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold text-stone-900 dark:text-white">
            Borrow Book
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Confirm your details below to borrow this book from the community library.
          </DialogDescription>
        </DialogHeader>

        {/* 2. Professional Mini Book Summary Card */}
        <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-stone-200/80 bg-stone-50/80 p-3.5 dark:border-stone-800 dark:bg-[#12281d]/60">
          <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-2xs dark:border-stone-700 dark:bg-[#163325]">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-stone-400">
                <BookOpen className="h-5 w-5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
              {book.title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
              by {book.author}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-full bg-stone-200/80 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:bg-[#1e3d2c] dark:text-[#86d39e]">
                {book.category}
              </span>
              <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300">
                {book.totalCopies ?? 1} copies left
              </span>
            </div>
          </div>
        </div>

        {/* 3. If User is NOT signed in */}
        {!user ? (
          <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-center dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-200">
              You must be signed in to borrow books.
            </p>
            <div className="mt-3">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#183b2b] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#122e22] dark:bg-[#86d39e] dark:text-[#0a1e14]"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In to Continue</span>
              </Link>
            </div>
          </div>
        ) : (
          /* 4. Professional Borrow Form */
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* User Name (Read-only) */}
            <div className="space-y-1">
              <Label htmlFor="userName" className="text-xs font-medium text-stone-600 dark:text-stone-300">
                User Name (Read-only)
              </Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={user.name || "Reader"}
                readOnly
                disabled
                className="h-9 rounded-lg border-stone-200 bg-stone-100/80 text-xs text-stone-700 dark:border-stone-700 dark:bg-[#152e22]/60 dark:text-stone-300 cursor-not-allowed"
              />
            </div>

            {/* User Email (Read-only) */}
            <div className="space-y-1">
              <Label htmlFor="userEmail" className="text-xs font-medium text-stone-600 dark:text-stone-300">
                User Email (Read-only)
              </Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={user.email || ""}
                readOnly
                disabled
                className="h-9 rounded-lg border-stone-200 bg-stone-100/80 text-xs text-stone-700 dark:border-stone-700 dark:bg-[#152e22]/60 dark:text-stone-300 cursor-not-allowed"
              />
            </div>

            {/* Date Selection: Borrow Date & Return Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Borrow Date */}
              <div className="space-y-1">
                <Label htmlFor="borrowDate" className="text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-stone-500" />
                  Borrow Date
                </Label>
                <Input
                  id="borrowDate"
                  type="date"
                  value={today}
                  readOnly
                  disabled
                  className="h-9 rounded-lg border-stone-200 bg-stone-100/80 text-xs text-stone-700 dark:border-stone-700 dark:bg-[#152e22]/60 dark:text-stone-300 cursor-not-allowed"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-1">
                <Label htmlFor="returnDate" className="text-xs font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#183b2b] dark:text-[#86d39e]" />
                  Return Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={returnDate}
                  min={tomorrow}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="h-9 rounded-lg border-stone-200 bg-white text-xs text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100 cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <DialogFooter className="mt-5 flex items-center justify-end gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    className="h-9 rounded-lg border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    Cancel
                  </Button>
                }
              />

              <Button
                type="submit"
                disabled={isSubmitting || !copiesAvailable}
                className="h-9 rounded-lg bg-[#183b2b] px-5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#122e22] active:scale-[0.98] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  "Confirm Borrow"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
