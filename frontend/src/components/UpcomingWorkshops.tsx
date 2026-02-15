"use client";

import { WorkshopAccordion } from "./WorkshopAccordion";
import { WorkshopDT } from "../types/WorkshopDT";
import { PageSection } from "./PageSection";

type UpcomingWorkshopsProps = {
  upcomingWorkshops: WorkshopDT[];
};

export function UpcomingWorkshops(props: UpcomingWorkshopsProps) {

  return (
    <PageSection title="Upcoming Workshops" color="black">
      <WorkshopAccordion workshops={props.upcomingWorkshops} />
    </PageSection>
  );
}
