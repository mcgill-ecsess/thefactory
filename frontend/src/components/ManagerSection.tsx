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
    <section className="bg-[#1a1e24] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-factory-green text-xs font-bold uppercase tracking-widest">
            The Team
          </span>
          <h2 className="text-4xl font-bold mt-2 text-balance">Managers</h2>
          <div className="h-px bg-white/10 mt-6" />
        </div>

        {/* Steering Committee */}
        <div className="mb-14">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-8">
            Steering Committee
          </p>
          <Grid container spacing={0}>
            {steeringCommittee.map((manager) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={manager.id}>
                <ManagerCard manager={manager} onClick={selectManager} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className="h-px bg-white/10 mb-14" />

        {/* General Managers */}
        <div>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-8">
            General Managers
          </p>
          <Grid container spacing={0}>
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
