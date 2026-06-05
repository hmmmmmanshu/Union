"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Our Model", href: "#mission" },
  { label: "Services", href: "#services" },
  { label: "User Stories", href: "#testimonials" },
  { label: "Why Union", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-union-border/60 bg-union-cream/90 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Logo-1.png"
            alt="Union"
            width={120}
            height={36}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-union-gray transition-colors hover:text-union-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden rounded-full bg-union-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-union-orange-dark md:inline-flex"
          >
            Join Union
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-union-border md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-union-border bg-union-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-union-gray"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              className="inline-flex w-fit rounded-full bg-union-orange px-6 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Join Union
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
