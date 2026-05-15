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
    <section className="text-white px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-factory-green text-xs font-semibold uppercase tracking-[0.18em]">
            The Team
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 text-balance">Managers</h2>
        </div>

        {/* Steering Committee */}
        <div className="mb-10">
          <p className="text-white/45 text-xs font-semibold uppercase tracking-[0.16em] mb-5">
            Steering Committee
          </p>
          <Grid container spacing={1}>
            {steeringCommittee.map((manager) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={manager.id}>
                <ManagerCard manager={manager} onClick={selectManager} />
              </Grid>
            ))}
          </Grid>
        </div>

        {/* General Managers */}
        <div>
          <p className="text-white/45 text-xs font-semibold uppercase tracking-[0.16em] mb-5">
            General Managers
          </p>
          <Grid container spacing={1}>
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
