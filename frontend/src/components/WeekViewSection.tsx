import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import WeekView from "./WeekView";
import { FactoryManager } from "../types/FactoryManager";

type WeekViewSectionProps = {
  managers: FactoryManager[];
};

// Sort function for managers based on Start_Time
const sortByStartTime = (a: FactoryManager, b: FactoryManager) => {
  return a.attributes.Start_Time.getTime() - b.attributes.Start_Time.getTime();
};

export function WeekViewSection(props: WeekViewSectionProps) {
  // Create an array that includes managers for both office hour slots
  const allOfficeHourManagers: FactoryManager[] = [];

  props.managers.forEach(manager => {
    // Add manager for first office hour slot if it exists
    if (manager.attributes.Office_Hour_Day && manager.attributes.Start_Time && manager.attributes.End_Time) {
      allOfficeHourManagers.push({
        ...manager,
        attributes: {
          ...manager.attributes,
          // Use first slot data
          Office_Hour_Day: manager.attributes.Office_Hour_Day,
          Start_Time: manager.attributes.Start_Time,
          End_Time: manager.attributes.End_Time
        }
      });
    }

    // Add manager for second office hour slot if it exists
    if (manager.attributes.Office_Hour_Day_2 && manager.attributes.Start_Time_2 && manager.attributes.End_Time_2) {
      allOfficeHourManagers.push({
        ...manager,
        attributes: {
          ...manager.attributes,
          // Use second slot data for the main fields
          Office_Hour_Day: manager.attributes.Office_Hour_Day_2,
          Start_Time: manager.attributes.Start_Time_2,
          End_Time: manager.attributes.End_Time_2
        }
      });
    }
  });

  // Process managers to group by day of the week using the expanded list
  const officeHours: { [key: string]: FactoryManager[] } = {
    Monday: allOfficeHourManagers
      .filter(
        (manager) => manager.attributes.Office_Hour_Day === "Monday"
      )
      .sort(sortByStartTime),
    Tuesday: allOfficeHourManagers
      .filter(
        (manager) => manager.attributes.Office_Hour_Day === "Tuesday"
      )
      .sort(sortByStartTime),
    Wednesday: allOfficeHourManagers
      .filter(
        (manager) => manager.attributes.Office_Hour_Day === "Wednesday"
      )
      .sort(sortByStartTime),
    Thursday: allOfficeHourManagers
      .filter(
        (manager) => manager.attributes.Office_Hour_Day === "Thursday"
      )
      .sort(sortByStartTime),
    Friday: allOfficeHourManagers
      .filter(
        (manager) => manager.attributes.Office_Hour_Day === "Friday"
      )
      .sort(sortByStartTime),
  };

  return (
    <Box className="py-10 px-8 flex flex-col basis-full items-center min-h-[750px] ">
      <Typography
        className="text-center"
        sx={{
          fontSize: {
            md: "4rem", // Size for medium screens and above
            sm: "3.5rem", // Size for small screens
            xs: "2.5rem", // Size for extra-small screens
          },
        }}
      >
        Office Hours
      </Typography>

      <Divider
        aria-hidden="true"
        sx={{
          opacity: 1,
          borderColor: "black",
          borderWidth: 2,
          width: "10%",
          alignSelf: "center",
          marginTop: "0.3rem",
          marginBottom: "1rem",
        }}
      />

      <WeekView
        officeHours={officeHours}
        startTime={new Date(2021, 1, 1, 10, 30)}
        endTime={new Date(2021, 1, 1, 17, 30)}
      />
    </Box>
  );
}