"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Sparkles, ArrowRight, BookPlus, CheckCircle2, BookOpen } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/img1.jpg",
    badge: "Community Book Exchange",
    title: "Your neighbourhood\nlibrary,",
    highlight: "online.",
    description:
      "Find books loved by fellow readers nearby, borrow them for free, and give your own bookshelf a second life.",
    primaryBtnText: "Explore All Books",
    primaryBtnLink: "/all-books",
    secondaryBtnText: "Share a Book",
    secondaryBtnLink: "/add-book",
  },
  {
    id: 2,
    image: "/images/img2.jpg",
    badge: "Effortless Lending",
    title: "Borrow, read,\nand return.",
    highlight: "Repeat.",
    description:
      "Enjoy 7 days of free reading for every title. Return with a single click whenever you finish your chapter.",
    primaryBtnText: "Browse Books",
    primaryBtnLink: "/all-books",
    secondaryBtnText: "Share a Book",
    secondaryBtnLink: "/add-book",
  },
  {
    id: 3,
    image: "/images/img3.jpg",
    badge: "Thousands of Stories",
    title: "Discover stories\nwaiting on",
    highlight: "local shelves.",
    description:
      "Connect with passionate readers and explore books shared across your neighbourhood community.",
    primaryBtnText: "Find Your Next Read",
    primaryBtnLink: "/all-books",
    secondaryBtnText: "Share a Book",
    secondaryBtnLink: "/add-book",
  },
  {
    id: 4,
    image: "/images/img4.jpg",
    badge: "Share & Inspire",
    title: "Share your favorites,\ninspire",
    highlight: "another reader.",
    description:
      "Add books from your home shelf in seconds and start connecting with fellow literature lovers.",
    primaryBtnText: "Add to Shelf",
    primaryBtnLink: "/add-book",
    secondaryBtnText: "Explore Books",
    secondaryBtnLink: "/all-books",
  },
  {
    id: 5,
    image: "/images/img5.jpg",
    badge: "Eco-Friendly Reading",
    title: "Read sustainably,\ntogether with",
    highlight: "community.",
    description:
      "Experience the joy of an endless personal library without cluttering your room or spending a dime.",
    primaryBtnText: "Start Exploring",
    primaryBtnLink: "/all-books",
    secondaryBtnText: "Share a Book",
    secondaryBtnLink: "/add-book",
  },
];

export default function Banner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trustHighlights = [
    "100% Free to Borrow",
    "7 Days per Book",
    "Community Powered",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#07170f]">
      {!mounted ? (
        // SSR / Initial Fallback view
        <div className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
          <div className="absolute inset-0">
            <Image
              src={slides[0].image}
              alt={slides[0].title.replace("\n", " ")}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Warm cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07170f]/80 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-xs mb-4">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>{slides[0].badge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] whitespace-pre-line drop-shadow-md">
                {slides[0].title}{" "}
                <span className="text-emerald-400">{slides[0].highlight}</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-200/90 leading-relaxed max-w-xl drop-shadow-xs">
                {slides[0].description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={slides[0].primaryBtnLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#86d39e] px-6 py-3 text-xs sm:text-sm font-bold text-[#07170f] shadow-lg shadow-black/25 hover:bg-[#72bf89] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{slides[0].primaryBtnText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={slides[0].secondaryBtnLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <BookPlus className="h-4 w-4" />
                  <span>{slides[0].secondaryBtnText}</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/15 text-xs font-medium text-stone-300">
                {trustHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "banner-bullet-active",
            bulletClass: "banner-bullet",
          }}
          loop={true}
          className="w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              className="relative w-full h-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center select-none"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title.replace("\n", " ")}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07170f]/80 to-transparent" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
                <div className="max-w-2xl">
                  {/* Frosted Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-xs mb-4">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Main Editorial Heading */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] whitespace-pre-line drop-shadow-md">
                    {slide.title}{" "}
                    <span className="text-emerald-400">{slide.highlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-200/90 leading-relaxed max-w-xl drop-shadow-xs">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
                    <Link
                      href={slide.primaryBtnLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#86d39e] px-6 py-3 text-xs sm:text-sm font-bold text-[#07170f] shadow-lg shadow-black/25 hover:bg-[#72bf89] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={slide.secondaryBtnLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <BookPlus className="h-4 w-4" />
                      <span>{slide.secondaryBtnText}</span>
                    </Link>
                  </div>

                  {/* Trust Highlights */}
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/15 text-xs font-medium text-stone-300">
                    {trustHighlights.map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Custom Styles for Swiper Pagination Bullets moved to globals.css */}
    </section>
  );
}
