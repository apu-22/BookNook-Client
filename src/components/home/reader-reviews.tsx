import { Star, Quote, BookOpen, Users, CheckCircle, ShieldCheck } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Book Club Organizer",
    initials: "SJ",
    avatarBg: "bg-emerald-700 text-white",
    review:
      "BookNook completely transformed my monthly reading goals. The borrowing flow is instant, and having a dedicated space to manage return dates makes keeping up with books effortless.",
    rating: 5,
    favoriteBook: "Borrowed: The Great Gatsby",
  },
  {
    name: "Tanvir Ahmed",
    role: "Software Developer",
    initials: "TA",
    avatarBg: "bg-teal-700 text-white",
    review:
      "The collection of self-help and technical titles shared by members is incredible. I have read 8 books this season without crowding my bookshelf at home. Truly a wonderful initiative!",
    rating: 5,
    favoriteBook: "Borrowed: Atomic Habits",
  },
  {
    name: "Elena Rostova",
    role: "Literature Enthusiast",
    initials: "ER",
    avatarBg: "bg-amber-700 text-white",
    review:
      "Returning a book with just one click is such a breath of fresh air compared to traditional systems. Everything feels cozy, warm, and thoughtfully crafted for actual readers.",
    rating: 5,
    favoriteBook: "Borrowed: To Kill a Mockingbird",
  },
];

const highlights = [
  { label: "Community Books", value: "1,500+", icon: BookOpen },
  { label: "Active Readers", value: "3,200+", icon: Users },
  { label: "On-Time Returns", value: "99.4%", icon: CheckCircle },
  { label: "Free Forever", value: "100%", icon: ShieldCheck },
];

export default function ReaderReviews() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#07170f] border-t border-stone-200/80 dark:border-[#1e3d2c]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#183b2b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
            Community Voices
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Reader Reviews
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Discover how BookNook helps fellow readers read more, save money, and share the joy of books.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-stone-50/60 p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#183b2b]/30 hover:bg-white hover:shadow-lg dark:border-[#1e3d2c] dark:bg-[#0f241a]/60 dark:hover:border-[#52b788]/40 dark:hover:bg-[#0f241a]"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-stone-300 dark:text-stone-700" />
                </div>

                {/* Review Text */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300 italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 pt-4 border-t border-stone-200/80 dark:border-[#1e3d2c] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${rev.avatarBg}`}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 sm:mt-16 rounded-2xl border border-stone-200/80 bg-stone-50/80 p-6 sm:p-8 dark:border-[#1e3d2c] dark:bg-[#0f241a]/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-[#1e3d2c]">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={index > 0 ? "pt-4 md:pt-0" : ""}>
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#183b2b]/10 text-[#183b2b] dark:bg-[#52b788]/15 dark:text-[#86d39e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
