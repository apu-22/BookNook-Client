"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { Pencil, Loader2 } from "lucide-react";

export interface BookItem {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies?: number;
  image?: string;
  description?: string;
}

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Philosophy",
  "Self-Help",
  "Children & Young Adult",
];

export default function EditBookDialog({ book }: { book: BookItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "Fiction",
    totalCopies: book?.totalCopies ?? 1,
    image: book?.image || "",
    description: book?.description || "",
  });

  // Whenever the dialog opens or the book prop changes, sync the form data with current book details
  useEffect(() => {
    if (open && book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "Fiction",
        totalCopies: book.totalCopies ?? 1,
        image: book.image || "",
        description: book.description || "",
      });
    }
  }, [open, book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/all-books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalCopies: Number(formData.totalCopies) || 1,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.add({
          title: "Book Updated Successfully!",
          description: `"${formData.title}" has been updated in the library.`,
          type: "success",
        });
        setOpen(false);
        router.refresh();
      } else {
        toast.add({
          title: "Update Failed",
          description: data?.message || "Failed to update book information.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.add({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-1.5 rounded-md border-stone-300 bg-white px-2.5 text-xs font-medium text-stone-700 shadow-2xs hover:bg-stone-50 dark:border-stone-700 dark:bg-[#12281d] dark:text-stone-300 dark:hover:bg-[#183b2b]/50 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5 text-stone-600 dark:text-stone-400" />
            <span>Edit</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-stone-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-[#0c1f15] dark:text-stone-100">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            Edit Book Information
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Update the book details below. Click &quot;Save changes&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* 1. Book Title */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. To Kill a Mockingbird"
              required
              className="h-9 rounded-lg border-stone-200 bg-stone-50/70 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100"
            />
          </div>

          {/* 2. Book Author */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-author" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Author <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Harper Lee"
              required
              className="h-9 rounded-lg border-stone-200 bg-stone-50/70 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100"
            />
          </div>

          {/* 3. Category & Total Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="edit-category" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-9 w-full rounded-lg border border-stone-200 bg-stone-50/70 px-3 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100 cursor-pointer"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-stone-900 dark:bg-[#0c1f15] dark:text-stone-100">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-copies" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Total Copies <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-copies"
                name="totalCopies"
                type="number"
                min={1}
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className="h-9 rounded-lg border-stone-200 bg-stone-50/70 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100"
              />
            </div>
          </div>

          {/* 4. Book Cover Image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-image" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Image URL
            </Label>
            <Input
              id="edit-image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="h-9 rounded-lg border-stone-200 bg-stone-50/70 px-3 text-xs sm:text-sm text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100"
            />
          </div>

          {/* 5. Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Description
            </Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary or notes about the book..."
              className="min-h-[75px] rounded-lg border-stone-200 bg-stone-50/70 p-2.5 text-xs sm:text-sm text-stone-900 focus:border-[#183b2b] dark:border-stone-700 dark:bg-[#142e22] dark:text-stone-100"
            />
          </div>

          {/* Dialog Action Buttons */}
          <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="h-9 rounded-lg border-stone-300 px-4 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-9 rounded-lg bg-[#183b2b] px-5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#122e22] active:scale-[0.98] dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89] cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
