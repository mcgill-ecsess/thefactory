"use client";

import React from "react";

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

type Props = {
  /** Shows the green grid + radial glow behind the hero */
  backdrop?: boolean;
  hero?: HeroProps;
  children: React.ReactNode;
  /** Extra classes on the outer <main> */
  className?: string;
};

/**
 * Shared dark-background page wrapper used across all Factory routes.
 * Provides: bg-factory-dark-black, optional hero with eyebrow/title/description,
 * optional grid+glow backdrop, and a max-width content column for children.
 */
export default function FactoryPageShell({ backdrop = false, hero, children, className }: Props) {
  return (
    <main className={`bg-factory-dark-black min-h-screen text-white${className ? ` ${className}` : ""}`}>
      {hero && (
        <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
          {backdrop && (
            <>
              {/* Subtle grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(87,191,148,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(87,191,148,0.04) 1px,transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              {/* Green radial glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full blur-3xl opacity-25"
                style={{ background: "radial-gradient(ellipse,#57bf94 0%,transparent 70%)" }}
              />
            </>
          )}

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {hero.eyebrow && (
              <div className="mb-4">
                <span className="inline-block text-factory-green text-xs font-semibold uppercase tracking-[0.22em]">
                  {hero.eyebrow}
                </span>
                <div className="w-16 h-0.5 bg-factory-green/70 mx-auto mt-2 rounded-sm" />
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance">
              {hero.title}
            </h1>
            {hero.description && (
              <p className="mt-5 text-white/50 text-lg leading-relaxed max-w-lg mx-auto text-pretty">
                {hero.description}
              </p>
            )}
          </div>
        </section>
      )}

      {children}
    </main>
  );
}

/** Horizontal rule consistent with the dark dark shell */
export function ShellDivider() {
  return <div className="h-px bg-white/10" />;
}

/**
 * Rounded glassy panel for dense UIs (tables, forms).
 * Drop inside FactoryPageShell's children.
 */
export function ShellPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/4 shadow-xl${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
