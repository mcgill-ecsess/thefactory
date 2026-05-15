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
    <section className="px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-white/45 text-sm md:text-base mb-6">
          Click any block to see manager details &amp; contact info
        </p>

        <WeekView
          officeHours={officeHours}
          startTime={new Date(2021, 1, 1, 10, 30)}
          endTime={new Date(2021, 1, 1, 17, 30)}
        />
      </div>
    </section>
  );
}
