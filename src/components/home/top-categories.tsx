import Link from "next/link";
import { Sparkles, Brain, Rocket, Compass, Award, GraduationCap, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/common/animations";

const categories = [
  {
    name: "Fiction",
    description: "Imaginative stories, contemporary novels, and timeless literary masterworks.",
    badge: "Most Popular",
    icon: Sparkles,
  },
  {
    name: "Self-Help",
    description: "Actionable frameworks for personal growth, productivity, and life habits.",
    badge: "Trending",
    icon: Brain,
  },
  {
    name: "Sci-Fi & Fantasy",
    description: "Expansive universes, future technology, magical worlds, and epic journeys.",
    badge: "Bestseller",
    icon: Rocket,
  },
  {
    name: "Mystery & Thriller",
    description: "Suspenseful investigations, psychological twists, and unsolved crimes.",
    badge: "Page Turners",
    icon: Compass,
  },
  {
    name: "Biography & Memoir",
    description: "True and inspiring journeys of influential thinkers, pioneers, and icons.",
    badge: "Inspiring",
    icon: Award,
  },
  {
    name: "History & Thought",
    description: "Deep historical perspectives, civilizational breakthroughs, and philosophy.",
    badge: "Essential",
    icon: GraduationCap,
  },
];

export default function TopCategories() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-stone-50/70 dark:bg-[#0a1e14]/60 border-t border-stone-200/80 dark:border-[#1e3d2c]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with FadeIn */}
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#183b2b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
            Curated Genres
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Top Categories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Find the perfect book for your current mood from our most popular community shelves.
          </p>
        </FadeIn>

        {/* Categories Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <FadeIn key={cat.name} delay={index * 0.07}>
                <Link
                  href="/all-books"
                  className="group relative flex h-full flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/40 hover:shadow-lg dark:border-[#1e3d2c] dark:bg-[#0f241a] dark:hover:border-[#52b788]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-[#183b2b] transition-colors duration-300 group-hover:bg-[#183b2b] group-hover:text-white dark:bg-[#183b2b]/40 dark:text-[#86d39e] dark:group-hover:bg-[#86d39e] dark:group-hover:text-[#07170f]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-[#142e20] dark:text-stone-300">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-lg font-bold text-stone-900 transition-colors group-hover:text-[#183b2b] dark:text-stone-100 dark:group-hover:text-[#86d39e]">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#183b2b] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#86d39e]">
                    <span>Explore books</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
