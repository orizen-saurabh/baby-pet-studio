"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate, PanInfo } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
// Generated from real Google reviews — run `python generate_testimonials.py` to refresh

import { TESTIMONIALS } from "@/data/testimonials";

// ─── Animated Star Rating ─────────────────────────────────────────────────────

function AnimatedStars({
  target,
  size = "sm",
  color = "text-amber-400",
}: {
  target: number;
  size?: "sm" | "lg";
  color?: string;
}) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.2,
      delay: 0.4,
      ease: "easeOut",
      onUpdate: (v) => setFilled(v),
    });
    return controls.stop;
  }, [target]);

  const starSize = size === "lg" ? "text-xl" : "text-sm";

  return (
    <div className={`flex gap-0.5 ${starSize} ${color}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const pct = Math.min(1, Math.max(0, filled - (i - 1)));
        return (
          <span key={i} className="relative inline-block">
            <span className="text-white/30">★</span>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative rounded-2xl overflow-hidden aspect-[4/5] select-none"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 85vw, 380px"
          draggable={false}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Star rating — top left */}
      <div className="absolute top-4 left-4">
        <AnimatedStars target={item.stars} size="sm" color="text-amber-300" />
      </div>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white text-sm leading-relaxed mb-3 line-clamp-3 font-light">
          &ldquo;{item.text}&rdquo;
        </p>
        <p className="text-white text-sm font-semibold">{item.name}</p>
        <p className="text-white/55 text-xs">{item.role}</p>
      </div>
    </motion.div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

const GAP = 20;

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const firstCard = container.querySelector<HTMLElement>("[data-card]");
      if (firstCard) {
        const cw = firstCard.offsetWidth;
        const containerW = container.offsetWidth;
        setCardW(cw);
        setVisibleCount(Math.max(1, Math.floor((containerW + GAP) / (cw + GAP))));
      }
    };
    // Small delay so CSS has applied
    const t = setTimeout(measure, 60);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const trackX = cardW > 0 ? -(current * (cardW + GAP)) : 0;
  const dragLeft = maxIndex > 0 && cardW > 0 ? -(maxIndex * (cardW + GAP)) : 0;

  return (
    <div>
      {/* Track */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: trackX }}
          drag="x"
          dragConstraints={{ left: dragLeft, right: 0 }}
          dragElastic={0.06}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", stiffness: 290, damping: 32 }}
        >
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              data-card=""
              className="flex-shrink-0 w-[82vw] sm:w-[340px] lg:w-[360px]"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-[#111111]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#111111] hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-white pb-24 pt-14 px-6"
      style={{  }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
            Loved by pet families everywhere
          </h2>
          <p className="text-[#6B7280] text-base max-w-md mx-auto">
            Every visit tells a story. Here&apos;s what our customers are saying.
          </p>
        </motion.div>

        {/* Carousel */}
        <TestimonialsCarousel />
      </div>
    </section>
  );
}
