"use client";

import { Grid } from "@mui/material";
import ManagerCard from "./ManagerCard";
import { useState } from "react";
import ManagerInfo from "./ManagerInfo";
import { FactoryManager } from "../types/FactoryManager";

type ManagerSectionProps = {
  managers: FactoryManager[];
};

const roleOrder = [
  "Head Manager",
  "Technical Director",
  "Finance Manager",
  "Workshop Manager",
  "Communications Manager",
];

export function ManagerSection(props: ManagerSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<FactoryManager | null>(null);

  const steeringCommittee = props.managers
    .filter((m) => roleOrder.includes(m.attributes.Role))
    .sort((a, b) => roleOrder.indexOf(a.attributes.Role) - roleOrder.indexOf(b.attributes.Role));

  const generalManagers = props.managers.filter(
    (m) => m.attributes.Role === "General Manager" || m.attributes.Role === "Factory Advisor"
  );

  const selectManager = (manager: FactoryManager) => {
    setSelectedManager(manager);
    setOpen(true);
  };

  return (
    <section className="bg-factory-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Managers</h2>
          <div className="section-divider" />
        </div>

        {/* Steering Committee */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/50 text-sm font-semibold uppercase tracking-widest px-3">
              Steering Committee
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <Grid container className="justify-center">
            {steeringCommittee.map((manager) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={manager.id}>
                <ManagerCard manager={manager} onClick={selectManager} />
              </Grid>
            ))}
          </Grid>
        </div>

        {/* General Managers */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/50 text-sm font-semibold uppercase tracking-widest px-3">
              General Managers
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <Grid container className="justify-center">
            {generalManagers.map((manager) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={manager.id}>
                <ManagerCard manager={manager} onClick={selectManager} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <ManagerInfo manager={selectedManager} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
