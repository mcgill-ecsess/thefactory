"use client";

import { useState } from "react";
import ManagerInfo from "./ManagerInfo";
import { FactoryManager } from "../types/FactoryManager";

export default function WeekView(props: {
  officeHours: { [key: string]: FactoryManager[] };
  startTime: Date;
  endTime: Date;
}) {
  const [open, setOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<FactoryManager | null>(null);

  function selectManager(manager: FactoryManager) {
    setSelectedManager(manager);
    setOpen(true);
  }

  function toTimeString(date: Date): string {
    return date.toLocaleTimeString("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  /**
   * Height is proportional to duration.
   * Unit = 30 minutes = SLOT_HEIGHT_PX.
   * So 1 hour = 2 × SLOT_HEIGHT_PX, 1.5 hours = 3 × SLOT_HEIGHT_PX (exactly 1.5× the 1-hour block).
   */
  const SLOT_HEIGHT_PX = 40; // px per 30-minute unit
  const SLOT_GAP_PX = 6;     // gap between blocks

  function getSlotHeight(start: Date, end: Date): number {
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const slots = durationMs / 1800000; // number of 30-min units
    return Math.max(slots * SLOT_HEIGHT_PX, SLOT_HEIGHT_PX);
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const hasValidData = days.some((day) =>
    (props.officeHours[day] ?? []).some(
      (m) => m.attributes.Office_Hour_Day && m.attributes.Start_Time && m.attributes.End_Time
    )
  );

  if (!hasValidData) {
    return (
      <div className="grid grid-cols-5 gap-3 w-full">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 pb-2">
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{dayAbbr[i]}</span>
            </div>
            <div className="rounded-lg bg-gray-100 text-gray-400 text-xs text-center py-3 px-1">
              Not yet finalized
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-2 md:gap-4 w-full">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col">
            {/* Day header */}
            <div className="text-center text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{dayAbbr[dayIndex]}</span>
            </div>

            {/* Time blocks */}
            <div className="flex flex-col" style={{ gap: `${SLOT_GAP_PX}px` }}>
              {(props.officeHours[day] ?? []).length === 0 ? (
                <div
                  className="rounded-xl border border-dashed border-gray-200 text-gray-300 text-[0.6rem] text-center flex items-center justify-center"
                  style={{ height: `${SLOT_HEIGHT_PX * 2}px` }}
                >
                  —
                </div>
              ) : (
                (props.officeHours[day] ?? []).map((officeHour, index) => {
                  const blockHeight = getSlotHeight(
                    officeHour.attributes.Start_Time,
                    officeHour.attributes.End_Time
                  );

                  return (
                    <button
                      key={index}
                      onClick={() => selectManager(officeHour)}
                      className="group relative w-full rounded-xl bg-factory-green/10 border border-factory-green/30 hover:bg-factory-green hover:border-factory-green text-left overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-factory-green focus:ring-offset-1"
                      style={{ height: `${blockHeight}px` }}
                      aria-label={`${officeHour.attributes.First_Name} office hours: ${toTimeString(officeHour.attributes.Start_Time)} to ${toTimeString(officeHour.attributes.End_Time)}`}
                    >
                      {/* Accent stripe */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-factory-green group-hover:bg-white/60 transition-colors duration-200 rounded-l-xl" />

                      <div className="pl-2 pr-1 py-1 flex flex-col justify-center h-full">
                        <span className="block text-[0.6rem] md:text-xs font-semibold text-factory-dark-green group-hover:text-white leading-tight truncate transition-colors duration-200">
                          {officeHour.attributes.First_Name}
                        </span>
                        {blockHeight >= SLOT_HEIGHT_PX * 1.5 && (
                          <span className="block text-[0.55rem] md:text-[0.65rem] text-gray-500 group-hover:text-white/80 leading-tight transition-colors duration-200 mt-0.5">
                            {toTimeString(officeHour.attributes.Start_Time)}
                            <br />
                            {toTimeString(officeHour.attributes.End_Time)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      <ManagerInfo manager={selectedManager} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
