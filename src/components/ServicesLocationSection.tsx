"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Pet Bathing & Grooming",
    description: "Full-service bath, blowdry, and brush for all breeds.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4Z" />
        <path d="M20 8h-4a2 2 0 0 0-2 2v5a4 4 0 0 0 8 0v-5a2 2 0 0 0-2-2Z" />
        <path d="M10 5h4" />
      </svg>
    ),
  },
  {
    title: "Fur Styling & Trimming",
    description: "Precision cuts and styling tailored to your pet's breed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Puppy Care Sessions",
    description: "Gentle introductory grooming for puppies under 6 months.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
      </svg>
    ),
  },
  {
    title: "Hygiene & Cleaning",
    description: "Nail trimming, ear cleaning, and dental hygiene care.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, backgroundColor: "#f3aaad", transition: { duration: 0.22 } }}
      className="flex items-start gap-4 p-6 rounded-2xl cursor-default"
      style={{
        background: "#FAFAFA",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.22s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#111111]"
        style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
        {service.icon}
      </div>
      <div>
        <p className="text-[15px] font-semibold text-[#111111] mb-0.5">{service.title}</p>
        <p className="text-sm text-[#6B7280] leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Left: Services ───────────────────────────────────────────────────────────

function ServicesColumn({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Heading */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-2">
          What we offer
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
          Our Services
        </h2>
        <p className="text-[#6B7280] text-base">Premium care for your pets</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Right: Location + Map ────────────────────────────────────────────────────

function LocationColumn({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col"
    >
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-2">
          Find us
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
          Visit the Studio
        </h2>
        <p className="text-[#6B7280] text-base">Come see us in Waterloo</p>
      </div>

      <div
        className="rounded-2xl overflow-hidden flex-1"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
      >
        {/* Map */}
        <motion.div
          className="relative"
          whileHover={{ filter: "brightness(1.04)", transition: { duration: 0.2 } }}
        >
          <iframe
            title="Baby Pet Studio location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d151.2054!3d-33.9003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1d7b9b4b1a7%3A0x1c2b3c4d5e6f7a8b!2sShop%208%2F18-20%20O&#39;Dea%20Ave%2C%20Waterloo%20NSW%202017!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info */}
        <div className="p-6 bg-white">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
            Trusted by 1000+ pet owners
          </span>

          <h3 className="text-base font-semibold text-[#111111] mb-4">
            Baby Pet Studio
          </h3>

          <div className="flex flex-col gap-3 mb-6">
            {/* Address */}
            <div className="flex items-start gap-3 text-sm text-[#6B7280]">
              <svg className="mt-0.5 flex-shrink-0 text-[#111111]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Shop 8/18-20 O&apos;Dea Ave, Waterloo NSW 2017
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <svg className="flex-shrink-0 text-[#111111]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.16h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02v-.14Z" />
              </svg>
              (02) 9000 0000
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <svg className="flex-shrink-0 text-[#111111]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Open until 7 PM
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <motion.a
              href="https://maps.google.com/?q=Shop+8/18-20+O'Dea+Ave,+Waterloo+NSW+2017"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="flex-1 text-center py-2.5 px-4 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#222222] transition-colors"
            >
              Get Directions
            </motion.a>
            <motion.a
              href="tel:0290000000"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="flex-1 text-center py-2.5 px-4 rounded-full border border-[#E5E7EB] text-[#111111] text-sm font-medium hover:bg-[#F9FAFB] transition-colors"
            >
              Call Now
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ServicesLocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="bg-white pb-28 pt-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ServicesColumn inView={inView} />
          <LocationColumn inView={inView} />
        </div>
      </div>
    </section>
  );
}
