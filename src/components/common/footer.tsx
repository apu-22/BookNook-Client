import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1f17] text-stone-300 transition-colors border-t border-[#18382b]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3d7a5a] text-[#0d1f17] shadow-xs transition-transform group-hover:scale-105">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                BookNook
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-400">
              A small neighbourhood library on the web. Share the books on your
              shelf and borrow the ones you have been meaning to read.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-stone-400" />
                <a
                  href="mailto:hello@booknook.app"
                  className="hover:text-stone-100 transition-colors"
                >
                  hello@booknook.app
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-stone-100 transition-colors"
                >
                  +880 1700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-stone-400" />
                <span>12 Reading Lane, Dhaka</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Follow us
            </h3>
            <div className="mt-4 flex items-center gap-3">
              {/* X (formerly Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183628] text-stone-300 hover:bg-[#224b37] hover:text-white transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183628] text-stone-300 hover:bg-[#224b37] hover:text-white transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183628] text-stone-300 hover:bg-[#224b37] hover:text-white transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-[#18382b] pt-8 text-center text-xs text-stone-400">
          <p>© 2026 BookNook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
