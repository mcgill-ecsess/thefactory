"use client";

import { WeekViewSection } from "@/components/WeekViewSection";
import { ManagerSection } from "@/components/ManagerSection";
import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import Spinner from "@/components/Spinner";

export default function OfficeHours() {
  const managers = useManagerAndLabData().managers; // Access the managers data from context

  if (!managers) return <Spinner />;

  return (
    <>
      <WeekViewSection managers={managers} />
      <ManagerSection managers={managers} />
    </>
  );
}
