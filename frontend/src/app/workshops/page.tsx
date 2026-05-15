"use client";

import { PastWorkshops } from "@/components/PastWorkshops";
import { UpcomingWorkshops } from "@/components/UpcomingWorkshops";
import { WorkshopDT } from "@/types/WorkshopDT";
import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import Spinner from "@/components/Spinner";
import FactoryPageShell from "@/components/FactoryPageShell";

export default function Workshops() {
  const { workshops } = useManagerAndLabData();

  if (!workshops) return <Spinner />;

  const upcomingWorkshops: WorkshopDT[] = [];
  const pastWorkshops: WorkshopDT[] = [];

  workshops.forEach((workshop) => {
    const workshopStartDateTime = new Date(
      `${workshop.attributes.Date}T${workshop.attributes.StartTime}`
    );
    if (workshopStartDateTime > new Date()) {
      upcomingWorkshops.push(workshop);
    } else {
      pastWorkshops.push(workshop);
    }
  });

  return (
    <FactoryPageShell
      className="relative office-hours-surface"
      hero={{
        eyebrow: "Build. Learn. Share.",
        title: "Workshops",
        description: "Hands-on sessions run by students for students building real hardware projects.",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-grid" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 office-hours-lighting" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 flex flex-col gap-8">
        <UpcomingWorkshops upcomingWorkshops={upcomingWorkshops} />
        <PastWorkshops pastWorkshops={pastWorkshops} />
      </div>
    </FactoryPageShell>
  );
}
