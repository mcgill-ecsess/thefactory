"use client";

import { WorkshopAccordion } from "./WorkshopAccordion";
import { WorkshopDT } from "../types/WorkshopDT";

type UpcomingWorkshopsProps = {
  upcomingWorkshops: WorkshopDT[];
};

export function UpcomingWorkshops(props: UpcomingWorkshopsProps) {
  return (
    <section className="py-2">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Upcoming Workshops</h2>
        <p className="text-sm md:text-base text-white/50 mt-1.5">
          Join sessions led by Factory members and managers.
        </p>
      </div>
      <WorkshopAccordion workshops={props.upcomingWorkshops} />
    </section>
  );
}
