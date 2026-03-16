"use client";

import { useManagerAndLabData } from "@/Contexts/ManagerAndLabContext";
import LabSectionComponent from "@/components/LabSectionComponent";
import Spinner from "@/components/Spinner";

export default function OurLab() {
  const { labSections } = useManagerAndLabData();

  if (!labSections) return <Spinner />;

  return (
    <div className="bg-factory-black min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-factory-black pt-16 pb-12 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(87,191,148,0.08),transparent)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Lab</h1>
          <div className="section-divider" />
          <p className="text-white/50 text-base max-w-xl mx-auto mt-2">
            Explore our state-of-the-art hardware and equipment available to members.
          </p>
        </div>
      </div>

      {/* Hero Images */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 justify-center">
          <img
            src="/FactoryFriendlyRobot.JPG"
            alt="Factory Robot"
            className="h-[420px] object-cover object-bottom rounded-2xl w-full lg:w-[48%] shadow-2xl"
          />
          <img
            src="/robotArm.JPG"
            alt="Robot Arm"
            className="h-[420px] object-cover object-bottom rounded-2xl w-full lg:w-[48%] shadow-2xl"
          />
        </div>
      </div>

      {/* Lab Sections */}
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
