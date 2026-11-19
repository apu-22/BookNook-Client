"use client";

import { useState, useEffect, useRef } from "react";
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
import { Pencil, Loader2, UploadCloud, FileImage, CheckCircle2 } from "lucide-react";
import { getClientToken } from "@/lib/getClientToken";

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
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function EditBookDialog({ book }: { book: BookItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "Fiction",
    totalCopies: book?.totalCopies ?? 1,
    image: book?.image || "",
    description: book?.description || "",
  });

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(book?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Whenever the dialog opens or the book prop changes, sync the form data
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
      setNewImageFile(null);
      setPreviewUrl(book.image || null);
      setUploadStatus("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.add({
          title: "File Too Large",
          description: "Please choose an image file smaller than 10MB.",
          type: "error",
        });
        return;
      }
      setNewImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToImgbb = async (file: File): Promise<string> => {
    const apiKey =
      process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
      "db821ade5aae71038f53530ac3076335";

    const bodyFormData = new FormData();
    bodyFormData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: bodyFormData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data?.error?.message || "Failed to upload image to ImgBB.");
    }

    return data.data.display_url || data.data.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadStatus("Updating book...");

    try {
      const jwtToken = await getClientToken();
      let finalImageUrl = formData.image;

      // If user selected a new file from their PC, upload it to ImgBB
      if (newImageFile) {
        setUploadStatus("Uploading new image to ImgBB...");
        finalImageUrl = await uploadToImgbb(newImageFile);
      }

      setUploadStatus("Saving changes...");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/all-books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwtToken?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          image: finalImageUrl,
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
    } catch (error: any) {
      console.error("Error updating book:", error);
      toast.add({
        title: "Update Error",
        description: error?.message || "Failed to connect to the server.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
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

          {/* 4. Book Cover Image Upload (Device Select + ImgBB) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>Book Cover Image</span>
              <span className="text-[11px] font-normal text-stone-500">Upload new from PC</span>
            </Label>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />

            {previewUrl ? (
              <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-stone-50/60 p-2.5 dark:border-stone-700 dark:bg-[#142e22]">
                <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-stone-200 shadow-2xs dark:bg-stone-800">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate flex items-center gap-1">
                    <FileImage className="h-3.5 w-3.5 text-[#183b2b] dark:text-[#86d39e]" />
                    <span>{newImageFile ? newImageFile.name : "Current Cover Photo"}</span>
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {newImageFile
                      ? (newImageFile.size / (1024 * 1024)).toFixed(2) + " MB (Ready to upload)"
                      : "Hosted on ImgBB / Web"}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 text-[11px] font-semibold text-[#183b2b] hover:underline dark:text-[#86d39e] cursor-pointer"
                  >
                    Change photo from device
                  </button>
                </div>
                {newImageFile && (
                  <div className="text-emerald-600 dark:text-emerald-400 pr-1">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 p-4 text-center hover:border-[#183b2b] hover:bg-stone-50 cursor-pointer dark:border-stone-700 dark:bg-[#142e22]/50 dark:hover:border-[#52b788]"
              >
                <UploadCloud className="h-5 w-5 text-stone-400 group-hover:text-[#183b2b] dark:group-hover:text-[#86d39e]" />
                <span className="mt-1 text-xs font-medium text-stone-700 dark:text-stone-300">
                  Click to select cover from device
                </span>
                <span className="text-[10px] text-stone-400">PNG, JPG, WebP up to 10MB</span>
              </div>
            )}
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
                  {uploadStatus || "Saving..."}
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
