"use client";

import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import { Divider, Typography } from "@mui/material";
import LabSectionComponent from "@/components/LabSectionComponent";
import Spinner from "@/components/Spinner";

export default function OurLab() {
  const { labSections } = useManagerAndLabData();

  if (!labSections) return <Spinner />;

  return (
    <div className="bg-factory-green">
      <div className="flex flex-col items-center pb-20 pt-10">
        <Typography
          className="text-center text-white"
          sx={{
            fontSize: {
              md: "4rem",
              sm: "3.5rem",
              xs: "2.5rem",
            },
          }}
        >
          Our Lab
        </Typography>
        <Divider
          aria-hidden="true"
          sx={{
            opacity: 1,
            borderColor: "white",
            borderWidth: 2,
            width: "10%",
            alignSelf: "center",
            marginTop: "0.3rem",
            marginBottom: "2rem",
          }}
        />

        <div className="flex flex-col lg:flex-row justify-center gap-y-10 lg:gap-x-5">
          <img
            src="/FactoryFriendlyRobot.JPG"
            alt=""
            className="h-[450px] object-cover object-bottom rounded-xl w-11/12 mx-auto lg:w-5/12"
          />
          <img
            src="/robotArm.JPG"
            alt=""
            className="h-[450px] object-cover object-bottom rounded-xl w-11/12 mx-auto lg:w-5/12"
          />
        </div>
      </div>

      {labSections.map((labSection) => (
        <LabSectionComponent
          key={labSection.id}
          SectionTitle={labSection.attributes.SectionTitle}
          LabSectionRows={labSection.attributes.LabSectionRows}
        />
      ))}
    </div>
  );
}
