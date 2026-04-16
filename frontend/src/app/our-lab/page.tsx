"use client";

import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import LabGallerySection from "@/components/LabGallerySection";
import Spinner from "@/components/Spinner";

export default function OurLab() {
  const { labSections } = useManagerAndLabData();

  if (!labSections) return <Spinner />;

  return (
    <main className="bg-factory-dark-black min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
        {/* Subtle grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(87,191,148,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(87,191,148,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(ellipse,#57bf94 0%,transparent 70%)" }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block text-factory-green text-xs font-semibold uppercase tracking-[0.22em] mb-4 border border-factory-green/30 rounded-full px-4 py-1.5">
            Equipment &amp; Workspace
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance">
            Our Lab
          </h1>
          <p className="mt-5 text-white/50 text-lg leading-relaxed max-w-lg mx-auto text-pretty">
            State-of-the-art hardware and equipment available to every Factory member.
          </p>
        </div>
      </section>

      {/* Hero photo strip */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { src: "/lab/IMG_0708.jpg", alt: "Lab overview", span: "col-span-2 row-span-2" },
            { src: "/lab/IMG_0709.jpg", alt: "Equipment detail" },
            { src: "/lab/IMG_0713.jpg", alt: "Workstation" },
            { src: "/lab/IMG_0714.jpg", alt: "Lab tools", span: "col-span-2" },
          ].map(({ src, alt, span = "" }) => (
            <div
              key={src}
              className={`${span} overflow-hidden rounded-2xl bg-white/5`}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full min-h-[180px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-white/10" />
      </div>

      {/* Equipment gallery sections */}
      <div className="py-8">
        {labSections.map((labSection, idx) => (
          <LabGallerySection
            key={labSection.id}
            index={idx}
            SectionTitle={labSection.attributes.SectionTitle}
            LabSectionRows={labSection.attributes.LabSectionRows}
          />
        ))}
      </div>
    </main>
  );
}
