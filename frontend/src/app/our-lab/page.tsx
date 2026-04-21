"use client";

import Image from "next/image";
import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import LabGallerySection from "@/components/LabGallerySection";
import Spinner from "@/components/Spinner";
import FactoryPageShell from "@/components/FactoryPageShell";

export default function OurLab() {
  const { labSections } = useManagerAndLabData();

  if (!labSections) return <Spinner />;

  return (
    <FactoryPageShell
      className="relative office-hours-surface"
      hero={{
        eyebrow: "Equipment & Workspace",
        title: "Our Lab",
        description: "State-of-the-art hardware and equipment available to every Factory member.",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-grid" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-lighting" />

      <div className="relative z-10">
      {/* Intro exposition wall */}
      <section className="px-6 pb-14">
        <div
          className="max-w-7xl mx-auto grid gap-4"
          style={{ gridTemplateColumns: "2.1fr 1fr 1fr", gridTemplateRows: "360px 240px" }}
        >
          {/* Large feature — spans 2 rows on the left */}
          <div className="relative row-span-2 overflow-hidden rounded-3xl bg-white/5">
            <Image
              src="/lab/IMG_0708.jpg"
              alt="Lab overview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              quality={80}
            />
          </div>

          {/* Top-right pair */}
          <div className="relative overflow-hidden rounded-3xl bg-white/5">
            <Image
              src="/lab/IMG_0709.jpg"
              alt="Equipment detail"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              quality={80}
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-white/5">
            <Image
              src="/lab/IMG_0713.jpg"
              alt="Workstation"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              quality={80}
            />
          </div>

          {/* Bottom-right pair spanning 2 columns */}
          <div className="relative col-span-2 overflow-hidden rounded-3xl bg-white/5">
            <Image
              src="/lab/IMG_0714.jpg"
              alt="Lab tools"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              quality={80}
            />
          </div>
        </div>
      </section>

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
      </div>
    </FactoryPageShell>
  );
}
