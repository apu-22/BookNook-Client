import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-160px)] w-full flex flex-col items-center justify-center p-6 bg-[#fcfbf7] dark:bg-[#07170f]">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="h-16 w-16 rounded-full border-4 border-stone-200 border-t-[#183b2b] animate-spin dark:border-stone-800 dark:border-t-[#86d39e]" />
        {/* Center Book Icon with subtle pulse */}
        <div className="absolute flex items-center justify-center text-[#183b2b] dark:text-[#86d39e] animate-pulse">
          <BookOpen className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-4 font-serif text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300">
        Loading books...
      </p>
      <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
        Gathering stories from the community shelf
      </p>
    </div>
  );
}
