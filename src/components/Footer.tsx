"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Services", "Testimonials", "Contact"];

// ─── Social Icons ─────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}


const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/babypetstudio/?hl=en",
    icon: <InstagramIcon />,
  },
];

// ─── Animated link with slide + underline ─────────────────────────────────────

function NavLink({ label }: { label: string }) {
  return (
    <motion.a
      href={label === "Testimonials" ? "#testimonials" : label === "Services" ? "#services" : `#${label.toLowerCase()}`}
      className="group relative w-fit text-sm text-[#111111]/70 hover:text-[#111111] transition-colors"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18 }}
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#111111]/50 transition-all duration-250 group-hover:w-full" />
    </motion.a>
  );
}

// ─── Social icon button ───────────────────────────────────────────────────────

function SocialButton({
  social,
  delay,
}: {
  social: (typeof SOCIALS)[0];
  delay: number;
}) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      animate={{ y: [0, -3, 0] }}
      transition={{
        repeat: Infinity,
        duration: 3 + delay * 0.4,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#ffffff",
        transition: { duration: 0.18 },
      }}
      className="w-9 h-9 rounded-full flex items-center justify-center text-[#111111]/70 hover:text-[#111111] transition-colors"
      style={{ background: "rgba(255,255,255,0.6)" }}
    >
      {social.icon}
    </motion.a>
  );
}

// ─── Columns ──────────────────────────────────────────────────────────────────

function BrandColumn() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-lg font-semibold text-[#111111] tracking-tight">
        Baby Pet Studio
      </span>
      <p className="text-sm text-[#111111]/60 leading-relaxed max-w-[200px]">
        Premium care for your pets, every visit.
      </p>
    </div>
  );
}

function LinksColumn() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-widest uppercase text-[#111111]/40 mb-1">
        Quick Links
      </span>
      {NAV_LINKS.map((label) => (
        <NavLink key={label} label={label} />
      ))}
    </div>
  );
}

function ContactColumn() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold tracking-widest uppercase text-[#111111]/40">
        Get in Touch
      </span>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2.5 text-sm text-[#111111]/65">
          <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Shop 8/18-20 O&apos;Dea Ave,<br />Waterloo NSW 2017
        </div>

        <a
          href="tel:0450850531"
          className="flex items-center gap-2.5 text-sm text-[#111111]/65 hover:text-[#111111] transition-colors w-fit"
        >
          <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.16h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02v-.14Z" />
          </svg>
          0450 850 531
        </a>
      </div>

      {/* Social icons */}
      <div className="flex gap-2.5 mt-1">
        {SOCIALS.map((s, i) => (
          <SocialButton key={s.label} social={s} delay={i * 0.3} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#f3aaad",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Main grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <BrandColumn />
          <LinksColumn />
          <ContactColumn />
        </motion.div>

        {/* Divider */}
        <div
          className="my-10"
          style={{ height: 1, background: "rgba(0,0,0,0.05)" }}
        />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#111111]/45"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>© 2026 Baby Pet Studio. All rights reserved.</span>
          <span>We care for your pets 🐾</span>
        </motion.div>
      </div>
    </footer>
  );
}
