import { Search, BookmarkCheck, BookOpen, RotateCcw } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover a Book",
    description:
      "Explore our community library to find your next great read across diverse genres and titles.",
    icon: Search,
  },
  {
    step: "02",
    title: "One-Click Borrow",
    description:
      "Select your return date and confirm your borrow in seconds. Simple, quick, and hassle-free.",
    icon: BookmarkCheck,
  },
  {
    step: "03",
    title: "Read & Enjoy",
    description:
      "Dive into your stories at your own pace from home, a cozy cafe, or on your daily commute.",
    icon: BookOpen,
  },
  {
    step: "04",
    title: "Easy Return",
    description:
      "When you are finished or on the due date, return the book with a single click from My Borrows.",
    icon: RotateCcw,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#07170f] border-t border-stone-200/80 dark:border-[#1e3d2c]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#183b2b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
            Simple Process
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            How Borrowing Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Borrowing books from BookNook is designed to be smooth, flexible, and completely free for our reading community.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col rounded-2xl border border-stone-200/90 bg-stone-50/60 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:bg-white hover:shadow-lg dark:border-[#1e3d2c] dark:bg-[#0f241a]/60 dark:hover:border-[#52b788]/40 dark:hover:bg-[#0f241a]"
              >
                {/* Step badge & icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#183b2b] text-white shadow-xs transition-transform duration-300 group-hover:scale-110 dark:bg-[#86d39e] dark:text-[#07170f]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-stone-300 dark:text-stone-700">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-5 font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
