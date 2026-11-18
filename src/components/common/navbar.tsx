"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BookOpen, Moon, Sun, Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-[#fbfbf9]/95 backdrop-blur-md transition-colors dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#183b2b] text-white shadow-xs transition-transform group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              BookNook
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isActive
                    ? "text-[#183b2b] font-semibold dark:text-emerald-400"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Theme Toggle, Login, Register */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-200/60 hover:text-stone-900 transition-colors dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            {mounted ? (
              isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <span className="h-5 w-5" />
            )}
          </button>

          {
            user ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="rounded-full">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="rounded-full">
                      {user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-56 p-3">
                  <PopoverHeader>
                    <PopoverTitle className="font-semibold text-neutral-900">{user?.name}</PopoverTitle>
                    <PopoverDescription className="text-xs text-neutral-500">
                      {user?.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <div className="mt-3 pt-2 border-t border-neutral-100">
                    <Button
                      onClick={() => signOut()}
                      variant="destructive"
                      size="sm"
                      className="w-full cursor-pointer"
                    >
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>

              </Popover>
            ) :
              <>
                <Link
                  href="/sign-in"
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-stone-300/80 bg-white/70 px-4 text-sm font-medium text-stone-800 shadow-2xs hover:bg-stone-100 hover:text-stone-950 transition-colors dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-[#183b2b] px-4 text-sm font-medium text-white shadow-xs hover:bg-[#122e22] transition-colors dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  Register
                </Link>

              </>
          }

        </div>

        {/* Mobile Hamburger & Theme Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-200/60 dark:text-stone-400 dark:hover:bg-stone-800"
          >
            {mounted ? (
              isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <span className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-700 hover:bg-stone-200/60 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#fbfbf9] px-4 py-4 md:hidden dark:border-stone-800 dark:bg-stone-950">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "bg-emerald-50 text-[#183b2b] font-semibold dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "text-stone-700 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-900"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-sm font-medium text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-9 items-center justify-center rounded-lg bg-[#183b2b] text-sm font-medium text-white dark:bg-emerald-700"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
