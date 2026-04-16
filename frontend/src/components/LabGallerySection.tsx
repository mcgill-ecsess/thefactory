"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { LabSectionRow } from "../types/LabSectionRow";

type Props = {
  SectionTitle: string;
  LabSectionRows: LabSectionRow[];
  index: number;
};

const STRAPI_BASE = "https://factorystrapi.mcgilleus.ca";

export default function LabGallerySection({ SectionTitle, LabSectionRows, index }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + LabSectionRows.length) % LabSectionRows.length : 0));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % LabSectionRows.length : 0));

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-factory-green font-mono text-sm opacity-60 tabular-nums select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {SectionTitle}
            </h2>
          </div>
          <div className="hidden sm:block h-px flex-1 bg-white/10 ml-4" />
          <span className="text-white/30 text-sm whitespace-nowrap">
            {LabSectionRows.length} item{LabSectionRows.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LabSectionRows.map((row, i) => {
            const description = row.Description ? row.Description[0] : null;
            const bullets = description?.children?.flatMap((c) =>
              c.children?.map((ch) => ch.text).filter(Boolean) ?? []
            ) ?? [];
            const imgUrl = `${STRAPI_BASE}${row.Image.data.attributes.url}`;

            // Give first card a wider span for visual rhythm
            const isFeature = i === 0 && LabSectionRows.length >= 3;

            return (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden bg-white/5 border border-white/8 hover:border-factory-green/40 transition-all duration-300 cursor-pointer ${
                  isFeature ? "sm:col-span-2" : ""
                }`}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${SectionTitle} item ${i + 1}`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isFeature ? "h-72 sm:h-80" : "h-64"}`}>
                  <Image
                    src={imgUrl}
                    alt={`${SectionTitle} — item ${i + 1}`}
                    fill
                    sizes={isFeature
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    quality={75}
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover: expand icon hint */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 12L12 2M12 2H7M12 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Bullets */}
                {bullets.length > 0 && (
                  <div className="p-4 border-t border-white/8">
                    <ul className="space-y-1">
                      {bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-factory-green flex-shrink-0" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${SectionTitle} lightbox`}
        >
          {/* Card — stop propagation so clicking card doesn't close */}
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl bg-factory-dark-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-factory-green/80 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={16} />
            </button>

            <div className="relative w-full h-[70vh]">
              <Image
                src={`${STRAPI_BASE}${LabSectionRows[lightboxIdx].Image.data.attributes.url}`}
                alt={`${SectionTitle} — item ${lightboxIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
                loading="eager"
                quality={85}
              />
            </div>

            {/* Description */}
            {(() => {
              const desc = LabSectionRows[lightboxIdx].Description?.[0];
              const bullets = desc?.children?.flatMap((c) =>
                c.children?.map((ch) => ch.text).filter(Boolean) ?? []
              ) ?? [];
              return bullets.length > 0 ? (
                <div className="p-5 border-t border-white/10">
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-white/75">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-factory-green flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })()}

            {/* Counter + nav */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/5">
              <span className="text-white/40 text-xs font-mono tabular-nums">
                {lightboxIdx + 1} / {LabSectionRows.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-factory-green hover:text-factory-green transition-colors"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-factory-green hover:text-factory-green transition-colors"
                  aria-label="Next item"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section divider */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="h-px bg-white/8" />
      </div>
    </section>
  );
}
