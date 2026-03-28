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
  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
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
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        onClick={onClose}
      />

      {/* Image container */}
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

        {/* Counter */}
        <div className="text-center mt-4 text-sm text-white/50">
          {index + 1} / {IMAGES.length}
        </div>
      </motion.div>

      {/* Close button */}
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

      {/* Prev button */}
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

      {/* Next button */}
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

// ─── Thumbnail ────────────────────────────────────────────────────────────────

function Thumbnail({
  image,
  index,
  inView,
  onClick,
}: {
  image: (typeof IMAGES)[0];
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl aspect-square w-full focus:outline-none"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.02 }}
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      {/* Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
        <motion.div
          className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const open = (i: number) => setLightboxIndex(i);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < IMAGES.length - 1 ? i + 1 : i)), []);

  return (
    <section id="gallery" ref={ref} className="bg-white pb-24 pt-14 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-2">
            Our Studio
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
            A peek inside
          </h2>
          <p className="text-[#6B7280] text-base max-w-sm mx-auto">
            A warm, safe space where every pet is treated like family.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {IMAGES.map((image, i) => (
            <Thumbnail
              key={image.src}
              image={image}
              index={i}
              inView={inView}
              onClick={() => open(i)}
            />
          ))}
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
