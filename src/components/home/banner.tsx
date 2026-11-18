"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/img1.jpg",
    tag: "BOOKNOOK",
    title: "Your neighbourhood\nlibrary, online",
    description:
      "Find a book that someone nearby already loved, and borrow it for a week.",
    buttonText: "Browse Books",
    buttonLink: "/books",
  },
  {
    id: 2,
    image: "/images/img2.jpg",
    tag: "BOOKNOOK",
    title: "Borrow, read,\nreturn. Repeat.",
    description:
      "Seven days for every book. Return it with one click when you are done.",
    buttonText: "Browse Books",
    buttonLink: "/books",
  },
  {
    id: 3,
    image: "/images/img3.jpg",
    tag: "BOOKNOOK",
    title: "Discover stories\nwaiting on local shelves",
    description:
      "Connect with fellow readers and explore thousands of books shared across your community.",
    buttonText: "Browse Books",
    buttonLink: "/books",
  },
  {
    id: 4,
    image: "/images/img4.jpg",
    tag: "BOOKNOOK",
    title: "Share your favorites,\ninspire another reader",
    description:
      "Add books from your shelf in seconds and give your collection a second life.",
    buttonText: "Browse Books",
    buttonLink: "/books",
  },
  {
    id: 5,
    image: "/images/img5.jpg",
    tag: "BOOKNOOK",
    title: "Read sustainably,\nread together",
    description:
      "Experience the joy of an endless personal library without filling up more room.",
    buttonText: "Browse Books",
    buttonLink: "/books",
  },
];

export default function Banner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {!mounted ? (
        // SSR / Fallback Slide (Landscape 16:9 ratio with controlled height)
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[360px] max-h-[480px]">
          <div className="absolute inset-0">
            <Image
              src={slides[0].image}
              alt={slides[0].title.replace("\n", " ")}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-16 text-left">
            <div className="max-w-2xl py-6">
              <span className="inline-block text-xs font-semibold tracking-[0.25em] text-[#d47a5b] uppercase mb-2">
                {slides[0].tag}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.18] whitespace-pre-line">
                {slides[0].title}
              </h1>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed max-w-xl">
                {slides[0].description}
              </p>
              <div className="mt-5 sm:mt-6">
                <Link
                  href={slides[0].buttonLink}
                  className="inline-flex items-center justify-center rounded-lg bg-[#183b2b] px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-[#122e22]"
                >
                  {slides[0].buttonText}
                </Link>
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
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "banner-bullet-active",
            bulletClass: "banner-bullet",
          }}
          loop={true}
          className="w-full aspect-[16/10] sm:aspect-[16/9] min-h-[360px] max-h-[480px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full select-none">
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
                {/* Dark Gradient Overlay for Maximum Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-16 text-left">
                <div className="max-w-2xl py-6">
                  {/* Small Tag */}
                  <span className="inline-block text-xs font-semibold tracking-[0.25em] text-[#d47a5b] uppercase mb-2">
                    {slide.tag}
                  </span>

                  {/* Main Heading */}
                  <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.18] whitespace-pre-line drop-shadow-sm">
                    {slide.title}
                  </h1>

                  {/* Subtitle / Description */}
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-5 sm:mt-6">
                    <Link
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center rounded-lg bg-[#183b2b] px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-md hover:bg-[#122e22] active:scale-95 transition-all duration-200"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Custom Styles for Swiper Pagination Bullets */}
      <style jsx global>{`
        .banner-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.5);
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .banner-bullet-active {
          background-color: #d47a5b !important;
          width: 20px;
          border-radius: 9999px;
          opacity: 1;
        }
        .swiper-pagination {
          bottom: 16px !important;
        }
      `}</style>
    </section>
  );
}
