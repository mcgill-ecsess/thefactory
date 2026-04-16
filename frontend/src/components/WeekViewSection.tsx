import WeekView from "./WeekView";
import { FactoryManager } from "../types/FactoryManager";

type WeekViewSectionProps = {
  managers: FactoryManager[];
};

const sortByStartTime = (a: FactoryManager, b: FactoryManager) =>
  a.attributes.Start_Time.getTime() - b.attributes.Start_Time.getTime();

export function WeekViewSection(props: WeekViewSectionProps) {
  const allOfficeHourManagers: FactoryManager[] = [];

  props.managers.forEach((manager) => {
    if (manager.attributes.Office_Hour_Day && manager.attributes.Start_Time && manager.attributes.End_Time) {
      allOfficeHourManagers.push({
        ...manager,
        attributes: {
          ...manager.attributes,
          Office_Hour_Day: manager.attributes.Office_Hour_Day,
          Start_Time: manager.attributes.Start_Time,
          End_Time: manager.attributes.End_Time,
        },
      });
    }
    if (manager.attributes.Office_Hour_Day_2 && manager.attributes.Start_Time_2 && manager.attributes.End_Time_2) {
      allOfficeHourManagers.push({
        ...manager,
        attributes: {
          ...manager.attributes,
          Office_Hour_Day: manager.attributes.Office_Hour_Day_2,
          Start_Time: manager.attributes.Start_Time_2,
          End_Time: manager.attributes.End_Time_2,
        },
      });
    }
  });

  const officeHours: { [key: string]: FactoryManager[] } = {
    Monday: allOfficeHourManagers.filter((m) => m.attributes.Office_Hour_Day === "Monday").sort(sortByStartTime),
    Tuesday: allOfficeHourManagers.filter((m) => m.attributes.Office_Hour_Day === "Tuesday").sort(sortByStartTime),
    Wednesday: allOfficeHourManagers.filter((m) => m.attributes.Office_Hour_Day === "Wednesday").sort(sortByStartTime),
    Thursday: allOfficeHourManagers.filter((m) => m.attributes.Office_Hour_Day === "Thursday").sort(sortByStartTime),
    Friday: allOfficeHourManagers.filter((m) => m.attributes.Office_Hour_Day === "Friday").sort(sortByStartTime),
  };

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-[600px]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-factory-green text-xs font-bold uppercase tracking-widest mb-3">
            Lab Schedule
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Office Hours
          </h2>
          <div className="section-divider !bg-factory-green mt-3" />
          <p className="text-gray-400 text-sm mt-4">
            Click any block to see manager details &amp; contact info
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-factory-green/20 border border-factory-green/40" />
            <span className="text-xs text-gray-400">1 hr session</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[18px] rounded-sm bg-factory-green/20 border border-factory-green/40" />
            <span className="text-xs text-gray-400">1.5 hr session</span>
          </div>
        </div>

        <WeekView
          officeHours={officeHours}
          startTime={new Date(2021, 1, 1, 10, 30)}
          endTime={new Date(2021, 1, 1, 17, 30)}
        />
      </div>
    </section>
  );
}
