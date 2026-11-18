"use client";

import { useState } from "react";
import { ChevronDown, Image as ImageIcon, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

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

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    totalCopies: 2,
    image: "",
    description: "",
    userName: "Md Korim Islam",
    userEmail: "korim123@gmail.com",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookPayload = {
        ...formData,
        description: formData.description,
      };

      const res = await fetch("http://localhost:8000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

        // Reset form keeping user info
        setFormData((prev) => ({
          ...prev,
          title: "",
          author: "",
          category: "Fiction",
          totalCopies: 1,
          image: "",
          shortDescription: "",
        }));
      } else {
        toast.add({
          title: "Failed to Add Book",
          description: data?.message || "Server rejected the book submission.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.add({
        title: "Connection Error",
        description: "Could not connect to server. Please verify backend is running on port 8000.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#fbfbf9] text-stone-900 transition-colors duration-300 dark:bg-[#0a1811] dark:text-stone-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl">
        {/* Compact Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white transition-colors">
            Add a Book
          </h1>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 transition-colors">
            Put a book from your shelf into the library.
          </p>
        </div>

        {/* Compact Book Form */}
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3.5">
          {/* Row 1: Book Title & Author Name */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                Book Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. A Brief History of Time"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-9 rounded-lg border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:border-[#52b788] dark:focus-visible:ring-[#52b788]/60 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="author" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                Author Name
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="e.g. Stephen Hawking"
                value={formData.author}
                onChange={handleChange}
                required
                className="h-9 rounded-lg border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:border-[#52b788] dark:focus-visible:ring-[#52b788]/60 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Category & Total Copies */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="category" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                Category
              </Label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-9 w-full appearance-none rounded-lg border border-stone-300 bg-white px-3 py-1.5 pr-8 text-xs sm:text-sm text-stone-900 outline-none transition-colors focus:border-[#183b2b] focus:ring-1 focus:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:focus:border-[#52b788] dark:focus:ring-[#52b788]/60 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white text-stone-900 dark:bg-[#0f241a] dark:text-stone-100">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="totalCopies" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                Total Copies
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                className="h-9 rounded-lg border-stone-300 bg-white px-3 text-xs sm:text-sm text-stone-900 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:focus-visible:border-[#52b788] dark:focus-visible:ring-[#52b788]/60 transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Book Image URL */}
          <div className="space-y-1">
            <Label htmlFor="image" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors flex items-center justify-between">
              <span>Book Image URL</span>
              <span className="text-[11px] text-stone-500 font-normal">Direct image link (JPG, PNG, WebP)</span>
            </Label>
            <div className="relative">
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://books.google.com/..."
                value={formData.image}
                onChange={handleChange}
                required
                className="h-9 rounded-lg border-stone-300 bg-white px-3 pr-9 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:border-[#52b788] dark:focus-visible:ring-[#52b788]/60 transition-colors"
              />
              <ImageIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            </div>
          </div>

          {/* Row 4: Short Description */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief summary of the book..."
              rows={2}
              value={formData.description}
              onChange={handleChange}
              className="min-h-[68px] w-full rounded-lg border-stone-300 bg-white p-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus-visible:border-[#183b2b] focus-visible:ring-1 focus-visible:ring-[#183b2b]/20 dark:border-[#1e3d2c] dark:bg-[#12281d] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus-visible:border-[#52b788] dark:focus-visible:ring-[#52b788]/60 resize-none transition-colors"
            />
          </div>

          {/* Row 5: User Name & User Email */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="userName" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                User Name
              </Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                readOnly
                className="h-9 rounded-lg border-stone-200 bg-stone-100/90 px-3 text-xs sm:text-sm text-stone-600 dark:border-[#1e3d2c] dark:bg-[#12281d]/80 dark:text-stone-400 cursor-not-allowed transition-colors"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="userEmail" className="text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors">
                User Email
              </Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                readOnly
                className="h-9 rounded-lg border-stone-200 bg-stone-100/90 px-3 text-xs sm:text-sm text-stone-600 dark:border-[#1e3d2c] dark:bg-[#12281d]/80 dark:text-stone-400 cursor-not-allowed transition-colors"
              />
            </div>
          </div>

          {/* Row 6: Submit Button */}
          <div className="pt-1.5">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 rounded-lg bg-[#183b2b] hover:bg-[#122e22] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all duration-150 cursor-pointer active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed dark:bg-[#86d39e] dark:hover:bg-[#72bf89] dark:text-[#0a1e14]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding Book...
                </span>
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
