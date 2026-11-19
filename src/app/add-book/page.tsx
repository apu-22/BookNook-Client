"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  UploadCloud,
  X,
  Loader2,
  CheckCircle2,
  FileImage,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { getClientToken } from "@/lib/getClientToken";

// Assignment Required Categories
const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    totalCopies: 2,
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const user = session?.user;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
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
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      throw new Error(
        data?.error?.message || "Failed to upload image to ImgBB."
      );
    }

    return data.data.display_url || data.data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jwtToken = await getClientToken();


    if (!imageFile) {
      toast.add({
        title: "Image Required",
        description: "Please select a book cover image to upload.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadStatus("Uploading image to ImgBB...");

    try {
      // 1. Upload cover image to ImgBB
      const uploadedImageUrl = await uploadToImgbb(imageFile);

      setUploadStatus("Saving book to database...");

      // 2. Prepare payload for MongoDB
      const bookPayload = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        totalCopies: Number(formData.totalCopies) || 1,
        image: uploadedImageUrl,
        description: formData.description,
        shortDescription: formData.description,
        userName: user?.name || "Anonymous Reader",
        userEmail: user?.email || "",
        addedAt: new Date().toISOString(),
      };

      // 3. Post to backend
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwtToken?.token}`
        },
        body: JSON.stringify(bookPayload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.add({
          title: "Book Added Successfully!",
          description: `"${formData.title}" has been saved to the library.`,
          type: "success",
        });

        // Reset form
        setFormData({
          title: "",
          author: "",
          category: "Fiction",
          totalCopies: 2,
          description: "",
        });
        setImageFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.add({
          title: "Failed to Add Book",
          description: data?.message || "Server rejected the book submission.",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.add({
        title: "Upload Failed",
        description:
          error?.message || "Could not complete image upload or book creation.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white transition-colors">
            Add a Book
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 transition-colors">
            Share a book from your shelf with the BookNook community.
          </p>
        </div>

        {/* Book Form */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
          {/* Row 1: Book Title & Author Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Book Title *
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. A Brief History of Time"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-10 rounded-xl border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="author"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Author Name *
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="e.g. Stephen Hawking"
                value={formData.author}
                onChange={handleChange}
                required
                className="h-10 rounded-xl border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>
          </div>

          {/* Row 2: Category & Total Copies */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="category"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Category *
              </Label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-10 w-full appearance-none rounded-xl border border-stone-300 bg-white px-3 pr-8 text-xs sm:text-sm text-stone-900 outline-none transition-colors focus:border-[#183b2b] focus:ring-1 focus:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:focus:border-[#52b788] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-white text-stone-900 dark:bg-[#0f241a] dark:text-stone-100"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="totalCopies"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Total Copies *
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className="h-10 rounded-xl border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100"
              />
            </div>
          </div>

          {/* Row 3: Book Image Upload (ImgBB) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>Book Cover Image *</span>
              <span className="text-[11px] font-normal text-stone-500">
                Uploaded securely to ImgBB
              </span>
            </Label>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />

            {!previewUrl ? (
              /* Dropzone / Upload Box */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-white/70 p-6 text-center transition-all duration-200 hover:border-[#183b2b] hover:bg-stone-50 cursor-pointer dark:border-[#1e3d2c] dark:bg-[#12281d]/50 dark:hover:border-[#52b788] dark:hover:bg-[#12281d]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-[#183b2b] transition-transform group-hover:scale-110 dark:bg-[#183b2b]/30 dark:text-[#86d39e]">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Click to select book cover from device
                </p>
                <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400">
                  PNG, JPG, JPEG or WebP (Max 10MB)
                </p>
              </div>
            ) : (
              /* Live Preview Card */
              <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs dark:border-[#1e3d2c] dark:bg-[#0f241a]">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100 shadow-2xs dark:bg-stone-800">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100">
                    <FileImage className="h-4 w-4 text-[#183b2b] dark:text-[#86d39e]" />
                    <span className="truncate">{imageFile?.name}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400">
                    {imageFile
                      ? (imageFile.size / (1024 * 1024)).toFixed(2) + " MB"
                      : ""}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-semibold text-[#183b2b] hover:underline dark:text-[#86d39e] cursor-pointer"
                    >
                      Change image
                    </button>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-[11px] font-semibold text-red-600 hover:underline dark:text-red-400 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 pr-2">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Short Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-xs font-semibold text-stone-700 dark:text-stone-300"
            >
              Short Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief summary or highlight of the book..."
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-stone-300 bg-white p-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500 resize-none"
            />
          </div>

          {/* Row 5: User Name & User Email (Read-only) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="userName"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                User Name (Read-only)
              </Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={user?.name || ""}
                readOnly
                placeholder="User Name"
                className="h-10 rounded-xl border-stone-200 bg-stone-100/80 px-3 text-xs sm:text-sm text-stone-600 dark:border-[#1e3d2c] dark:bg-[#12281d]/80 dark:text-stone-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="userEmail"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                User Email (Read-only)
              </Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={user?.email || ""}
                readOnly
                placeholder="User Email"
                className="h-10 rounded-xl border-stone-200 bg-stone-100/80 px-3 text-xs sm:text-sm text-stone-600 dark:border-[#1e3d2c] dark:bg-[#12281d]/80 dark:text-stone-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-[#183b2b] text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#122e22] active:scale-[0.99] transition-all cursor-pointer dark:bg-[#86d39e] dark:text-[#0a1e14] dark:hover:bg-[#72bf89]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{uploadStatus || "Processing..."}</span>
                </div>
              ) : (
                "Add Book"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
