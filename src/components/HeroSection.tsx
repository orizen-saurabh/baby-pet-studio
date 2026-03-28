"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, animate } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const AVATARS = ["/dog.jpg", "/bun.jpg", "/unnamed.jpg", "/group.jpg"];

// ─── Animated Stars ───────────────────────────────────────────────────────────

function AnimatedStars({ target }: { target: number }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.4,
      delay: 1.0,
      ease: "easeOut",
      onUpdate: (v) => setFilled(v),
    });
    return controls.stop;
  }, [target]);

  return (
    <div className="flex gap-0.5 text-[17px]">
      {[1, 2, 3, 4, 5].map((i) => {
        const pct = Math.min(1, Math.max(0, filled - (i - 1)));
        return (
          <span key={i} className="relative inline-block">
            <span className="text-white/25">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-amber-400"
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

// ─── Social Proof Card ────────────────────────────────────────────────────────

function SocialProofCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut", delay: 2 }}
      >
        <div
          className="flex items-center gap-5 px-8 py-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Avatar stack — 30% bigger: w-12 h-12 vs original w-9 h-9 */}
          <div className="flex -space-x-3.5">
            {AVATARS.map((src, i) => (
              <div
                key={i}
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/70 ring-1 ring-black/10"
                style={{ zIndex: AVATARS.length - i }}
              >
                <Image src={src} alt="avatar" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-white/20" />

          {/* Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <AnimatedStars target={4.5} />
              <span className="text-base font-semibold text-white leading-none">
                4.5 Rating
              </span>
              <span className="text-sm text-white/55">(80+ reviews)</span>
            </div>
            <p className="text-sm text-white/65">
              Trusted by{" "}
              <span className="font-semibold text-white">1000+</span> customers
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Hero image — full width, natural aspect ratio, fully visible */}
      <motion.div
        className="relative w-full"
        style={{ scale, opacity, filter: blurFilter }}
      >
        <Image
          src="/hero.png"
          alt="Baby Pet Studio Hero"
          width={1200}
          height={900}
          priority
          className="w-full h-auto block"
        />
        {/* Gradient overlay for bottom legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Social proof card — bottom left */}
      <div className="absolute bottom-8 left-8 z-10">
        <SocialProofCard />
      </div>

      {/* Scroll hint — bottom center, desktop only */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase text-white/50 font-medium">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
