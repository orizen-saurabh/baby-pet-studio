"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const IMAGES = [
  { src: "/shop1.jpg", alt: "Baby Pet Studio — shop view 1" },
  { src: "/shop2.jpg", alt: "Baby Pet Studio — shop view 2" },
  { src: "/shop3.jpg", alt: "Baby Pet Studio — shop view 3" },
  { src: "/shop4.jpg", alt: "Baby Pet Studio — shop view 4" },
];

const STATS = [
  { value: "4.5★", label: "Google Rating" },
  { value: "84+", label: "Happy Reviews" },
  { value: "5+", label: "Years Open" },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const image = IMAGES[index];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/85"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        onClick={onClose}
      />
      <motion.div
        key={index}
        className="relative z-10 max-w-4xl w-full mx-6"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={900}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
          />
        </div>
        <div className="text-center mt-4 text-sm text-white/50">
          {index + 1} / {IMAGES.length}
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.1)" }}
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={index === 0}
        className="absolute left-4 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white disabled:opacity-20 transition-all"
        style={{ background: "rgba(255,255,255,0.1)", top: "50%", transform: "translateY(-50%)" }}
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={index === IMAGES.length - 1}
        className="absolute right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white disabled:opacity-20 transition-all"
        style={{ background: "rgba(255,255,255,0.1)", top: "50%", transform: "translateY(-50%)" }}
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  );
}

// ─── Studio Carousel ──────────────────────────────────────────────────────────

function StudioCarousel({ onOpenLightbox }: { onOpenLightbox: (i: number) => void }) {
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Image frame */}
      <div
        className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
        style={{ aspectRatio: "4/3" }}
        onClick={() => onOpenLightbox(current)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={IMAGES[current].src}
              alt={IMAGES[current].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-1.5 bg-[#111111]" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < IMAGES.length - 1 ? i + 1 : i)), []);

  return (
    <section id="about" ref={ref} className="bg-[#FAFAFA] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Column 1: About Us ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-6 leading-tight">
              Where every pet<br />feels at home
            </h2>

            <div className="space-y-4 text-[#4B5563] text-base leading-relaxed">
              <p>
                Nestled in the heart of Waterloo, Baby Pet Studio is a professional grooming salon
                and retail boutique built around one simple belief — your pet deserves to be
                treated like family.
              </p>
              <p>
                Our experienced groomers take the time to understand each pet&apos;s personality,
                coat needs, and any anxieties before every session. Whether it&apos;s a relaxing
                spa bath, a precision haircut, or a full groom, we make sure every visit is calm,
                comfortable, and fun.
              </p>
              <p>
                We also stock a curated range of premium treats, raw food, and pet accessories
                in our in-store boutique — because great care extends beyond the grooming table.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                >
                  <p className="text-2xl font-semibold text-[#111111]">{stat.value}</p>
                  <p className="text-sm text-[#6B7280] mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Column 2: Our Studio Carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-3">
              Our Studio
            </p>
            <StudioCarousel onOpenLightbox={setLightboxIndex} />
          </motion.div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
