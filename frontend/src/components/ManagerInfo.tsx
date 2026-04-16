"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FactoryManager } from "../types/FactoryManager";

const STRAPI_BASE = "https://factorystrapi.mcgilleus.ca";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function ManagerInfo(props: {
  manager: FactoryManager | null;
  open: boolean;
  onClose: () => void;
}) {
  const { manager, open, onClose } = props;

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !manager) return null;

  const pictureUrl = manager.attributes.picture.data
    ? `${STRAPI_BASE}${manager.attributes.picture.data.attributes.url}`
    : null;

  const initials = `${manager.attributes.First_Name?.charAt(0) ?? ""}${manager.attributes.Last_Name?.charAt(0) ?? ""}`;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${manager.attributes.First_Name} ${manager.attributes.Last_Name} details`}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#1e2530", border: "1px solid rgba(87,191,148,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-factory-green" />

        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Header row */}
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-factory-green/10">
              {pictureUrl ? (
                <Image
                  src={pictureUrl}
                  alt={manager.attributes.First_Name}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                  loading="eager"
                  quality={75}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-factory-green font-bold text-2xl select-none">
                  {initials}
                </div>
              )}
            </div>

            {/* Name + meta */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <h3 className="text-white font-semibold text-lg leading-tight truncate">
                {manager.attributes.First_Name} {manager.attributes.Last_Name}
              </h3>
              {manager.attributes.Role && (
                <span className="text-factory-green text-sm font-medium truncate">
                  {manager.attributes.Role}
                </span>
              )}
              {manager.attributes.Year_Major && (
                <span className="text-white/50 text-xs truncate">
                  {manager.attributes.Year_Major}
                </span>
              )}
            </div>
          </div>

          {/* Info rows */}
          <div className="flex flex-col gap-2 mb-5">
            {manager.attributes.Office_Hour_Day && (
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-factory-green mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70 text-sm leading-relaxed">
                  {manager.attributes.Office_Hour_Day},{" "}
                  {formatTime(manager.attributes.Start_Time)} &ndash;{" "}
                  {formatTime(manager.attributes.End_Time)}
                </span>
              </div>
            )}
            {manager.attributes.McGill_Email && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-factory-green shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${manager.attributes.McGill_Email}`}
                  className="text-factory-green hover:text-factory-dark-green text-sm underline underline-offset-2 transition-colors duration-150 truncate"
                >
                  {manager.attributes.McGill_Email}
                </a>
              </div>
            )}
          </div>

          {/* Skills */}
          {manager.attributes.Skills && manager.attributes.Skills.length > 0 && (
            <>
              <div className="h-px w-full mb-4" style={{ backgroundColor: "rgba(87,191,148,0.15)" }} />
              <div>
                <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Skills</h4>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {manager.attributes.Skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-factory-green/15 text-factory-green border border-factory-green/20"
                    >
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
