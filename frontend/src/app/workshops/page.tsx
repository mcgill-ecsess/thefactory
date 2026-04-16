"use client";

import { PastWorkshops } from "@/components/PastWorkshops";
import { UpcomingWorkshops } from "@/components/UpcomingWorkshops";
import { WorkshopDT } from "@/types/WorkshopDT";
import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import Spinner from "@/components/Spinner";

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
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-factory-black py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Workshops</h1>
        <div className="section-divider" />
        <p className="text-white/50 text-base max-w-md mx-auto mt-2">
          Hands-on sessions to help you learn and build.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 flex flex-col gap-12">
        <UpcomingWorkshops upcomingWorkshops={upcomingWorkshops} />
        <PastWorkshops pastWorkshops={pastWorkshops} />
      </div>
    </div>
  );
}
