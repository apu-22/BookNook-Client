"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteBookInfo({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/all-books/${id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.add({
          title: "Book Deleted Successfully",
          description: `"${title}" has been removed from the library.`,
          type: "success",
        });
        setOpen(false);
        router.refresh();
      } else {
        toast.add({
          title: "Failed to Delete",
          description: data?.message || "Could not delete this book.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.add({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-1 rounded-md border border-red-300/80 bg-red-50/80 px-2.5 text-xs font-medium text-red-600 shadow-2xs hover:bg-red-100 hover:text-red-700 transition-colors dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        }
      />

      <AlertDialogContent className="sm:max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-[#0c1f15] dark:text-stone-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-lg font-bold text-stone-900 dark:text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              &quot;{title}&quot;
            </span>{" "}
            from the community library.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex items-center justify-end gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-9 rounded-lg border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-9 rounded-lg bg-red-600 px-4 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Book"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
