"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function InstagramIcon({ scrolled }: { scrolled: boolean }) {
  return (
    <a
      href="https://www.instagram.com/babypetstudio/?hl=en"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className={`transition-colors duration-500 ${scrolled ? "text-white/80 hover:text-white" : "text-[#111111]/70 hover:text-[#111111]"}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="w-full sticky top-0 z-30 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.08)"
          : "linear-gradient(to right, #e89597, #f3a9aa, #f09ea4)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Baby Pet Studio"
          width={360}
          height={120}
          className="h-[120px] w-auto object-contain"
        />

        {/* Nav links */}
        <nav className="flex items-center gap-7">
          {["Services", "About Us", "Contact Us"].map((label) => (
            <a
              key={label}
              href={`#${label === "About Us" ? "about" : label === "Contact Us" ? "contact" : "services"}`}
              className={`text-sm font-medium transition-colors duration-500 ${
                scrolled
                  ? "text-[#111111]/70 hover:text-[#111111]"
                  : "text-[#111111]/80 hover:text-[#111111]"
              }`}
            >
              {label}
            </a>
          ))}
          <InstagramIcon scrolled={scrolled} />
        </nav>
      </div>
    </header>
  );
}
