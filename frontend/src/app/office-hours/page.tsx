"use client";

import { WeekViewSection } from "@/components/WeekViewSection";
import { ManagerSection } from "@/components/ManagerSection";
import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import Spinner from "@/components/Spinner";
import FactoryPageShell from "@/components/FactoryPageShell";

export default function OfficeHours() {
  const managers = useManagerAndLabData().managers;

  if (!managers) return <Spinner />;

  return (
    <FactoryPageShell
      className="relative office-hours-surface"
      hero={{
        eyebrow: "Meet The Team",
        title: "Office Hours",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-grid" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-lighting" />

      <div className="relative z-10">
      <WeekViewSection managers={managers} />
      <ManagerSection managers={managers} />
      </div>
    </FactoryPageShell>
  );
}
