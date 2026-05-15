"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { WorkshopAccordion } from "./WorkshopAccordion";
import { WorkshopDT } from "../types/WorkshopDT";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React from "react";

type PastWorkshopsProps = {
  pastWorkshops: WorkshopDT[];
};

function getSemester(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  if (month >= 9 && month <= 12) {
    return `Fall ${year}`;
  } else if (month >= 1 && month <= 4) {
    return `Winter ${year}`;
  } else if (month >= 5 && month <= 8) {
    return `Summer ${year}`;
  }
  return "Unknown";
}

function groupWorkshopsBySemester(workshops: WorkshopDT[]) {
  const grouped: Record<string, WorkshopDT[]> = {};
  workshops.forEach((workshop) => {
    const semester = getSemester(workshop.attributes.Date);
    if (!grouped[semester]) {
      grouped[semester] = [];
    }
    grouped[semester].push(workshop);
  });
  return grouped;
}

export function PastWorkshops(props: PastWorkshopsProps) {
  const [value, setValue] = React.useState(0);
  const groupedWorkshops = groupWorkshopsBySemester(props.pastWorkshops);
  const semesters = Object.keys(groupedWorkshops);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="py-2">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Past Workshops</h2>
          <p className="text-sm md:text-base text-white/50 mt-1.5">
            Browse previous semesters and revisit workshop material.
          </p>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            minHeight: 42,
            mb: 2,
            "& .MuiTab-root": {
              color: "rgba(255,255,255,0.5)",
              textTransform: "none",
              letterSpacing: "0.01em",
              fontSize: "0.92rem",
              fontWeight: 600,
              minHeight: 42,
              px: 2,
            },
            "& .MuiTab-root.Mui-selected": { color: "#57bf94" },
            "& .MuiTabs-indicator": { backgroundColor: "#57bf94" },
            "& .MuiTabScrollButton-root": { color: "rgba(255,255,255,0.4)" },
          }}
        >
          {semesters.map((semester, index) => (
            <Tab label={semester} key={index} />
          ))}
        </Tabs>

        {semesters.map((semester, index) => (
          <CustomTabPanel
            value={value}
            index={index}
            pastWorkshops={groupedWorkshops[semester]}
            key={index}
          />
        ))}
      </section>
    </ThemeProvider>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  pastWorkshops: WorkshopDT[];
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, pastWorkshops, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <WorkshopAccordion workshops={pastWorkshops} />}
    </div>
  );
}
