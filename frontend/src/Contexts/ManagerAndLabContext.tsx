"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FactoryManager } from "../types/FactoryManager";
import { LabSection } from "../types/LabSection";
import { WorkshopDT } from "../types/WorkshopDT";

type ManagerAndLabContextType = {
  managers: FactoryManager[] | null;
  labSections: LabSection[] | null;
  workshops: WorkshopDT[] | null;
};

const ManagerAndLabContext = createContext<ManagerAndLabContextType | null>(null);

export function ManagerAndLabProvider({ children }: { children: ReactNode }) {
  const [managers, setManagers] = useState<FactoryManager[] | null>(null);
  const [labSections, setLabSections] = useState<LabSection[] | null>(null);
  const [workshops, setWorkshops] = useState<WorkshopDT[] | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

    // Fetch managers
    fetch("https://factorystrapi.mcgilleus.ca/api/managers?populate=*", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const managersWithDates = data.data.map((manager: any) => ({
          ...manager,
          attributes: {
            ...manager.attributes,
            Start_Time: convertTimeStringToDate(manager.attributes.Start_Time),
            End_Time: convertTimeStringToDate(manager.attributes.End_Time),
            Start_Time_2: convertTimeStringToDate(manager.attributes.Start_Time_2),
            End_Time_2: convertTimeStringToDate(manager.attributes.End_Time_2),
          },
        }));
        const correctedManagers = correctForDuplicateFirstNames(managersWithDates);
        setManagers(correctedManagers);
      })
      .catch((error) => console.log(error));

    // Fetch lab sections
    fetch("https://factorystrapi.mcgilleus.ca/api/lab-items?populate[LabSectionRows][populate]=Image", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
      .then((response) => response.json())
      .then((data) => setLabSections(data.data))
      .catch((error) => console.log(error));

    // Fetch workshops
    fetch("https://factorystrapi.mcgilleus.ca/api/workshops?populate=*", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
      .then((response) => response.json())
      .then((data) => setWorkshops(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ManagerAndLabContext.Provider value={{ managers, labSections, workshops }}>
      {children}
    </ManagerAndLabContext.Provider>
  );
}

export function useManagerAndLabData() {
  const context = useContext(ManagerAndLabContext);
  if (!context) {
    throw new Error("useManagerAndLabData must be used within a ManagerAndLabProvider");
  }
  return context;
}

// Utility functions
function convertTimeStringToDate(timeString: string | null) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  return new Date(2021, 0, 1, hours, minutes);
}

function correctForDuplicateFirstNames(officeHours: FactoryManager[]) {
  const firstNameCount: { [key: string]: number } = {};
  officeHours.forEach((manager) => {
    const firstName = manager.attributes.First_Name.trim();
    firstNameCount[firstName] = (firstNameCount[firstName] || 0) + 1;
  });
  officeHours.forEach((manager) => {
    const firstName = manager.attributes.First_Name.trim();
    if (firstNameCount[firstName] > 1) {
      manager.attributes.Modified_First_Name = `${firstName} ${manager.attributes.Last_Name.charAt(0)}`;
    } else {
      manager.attributes.Modified_First_Name = firstName;
    }
  });
  return officeHours;
}
