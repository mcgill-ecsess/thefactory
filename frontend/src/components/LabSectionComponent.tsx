"use client";

import { Divider, Typography } from "@mui/material";
import { LabSectionRow } from "../types/LabSectionRow";
import ReactSimplyCarousel from "react-simply-carousel";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import arrow icons

type LabSectionComponentProps = {
  SectionTitle: string;
  LabSectionRows: LabSectionRow[];
};

export default function LabSectionComponent(props: LabSectionComponentProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Function to dynamically set the size of the arrows based on screen width
  const getArrowSize = () => {
    // Guard against server-side rendering where window is not defined
    if (typeof window === "undefined") {
      return {
        size: 30,
        height: 60,
        width: 60,
      };
    }

    if (window.innerWidth >= 1300) {
      return {
        size: 40, // Icon size in pixels
        height: 70,
        width: 70,
      };
    } else if (window.innerWidth >= 800) {
      return {
        size: 30, // Icon size for smaller screens
        height: 60,
        width: 60,
      };
    } else {
      return {
        size: 20, // Icon size for extra small screens
        height: 45,
        width: 45,
      };
    }
  };

  const [arrowSize, setArrowSize] = useState(getArrowSize);

  useEffect(() => {
    const handleResize = () => {
      setArrowSize(getArrowSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-factory-black text-white">
      <div className="flex flex-col items-center pt-12">
        <Typography
          className="text-center text-white px-2"
          sx={{
            fontSize: {
              md: "3rem", // Size for medium screens and above
              sm: "2.5rem", // Size for small screens
              xs: "2rem", // Size for extra-small screens
            },
          }}
        >
          {props.SectionTitle}
        </Typography>
        <Divider
          aria-hidden="true"
          sx={{
            opacity: 1,
            borderColor: "white",
            borderWidth: 2,
            width: "20%",
            alignSelf: "center",
            marginTop: "1rem",
            marginBottom: "4rem",
          }}
        />
      </div>

      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        disableSwipeByMouse={true}
        disableSwipeByTouch={true}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            background: "black",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            height: arrowSize.height,
            width: arrowSize.width,
            lineHeight: 1,
            textAlign: "center",
            display: "flex", // Use flexbox for centering
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          },
          children: (
            <ChevronRight
              size={arrowSize.size} // Set the size dynamically
              color="white"
            />
          ),
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            background: "black",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            height: arrowSize.height,
            width: arrowSize.width,
            lineHeight: 1,
            textAlign: "center",
            display: "flex", // Use flexbox for centering
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          },
          children: (
            <ChevronLeft
              size={arrowSize.size} // Set the size dynamically
              color="white"
            />
          ),
        }}
        responsiveProps={[
          { minWidth: 1280, itemsToShow: 2 },
          { maxWidth: 1280, itemsToShow: 1 },
        ]}
        speed={400}
        easing="linear"
      >
        {props.LabSectionRows.map((section, index) => (
          <LabSectionRowComponent key={index} LabSectionRow={section} />
        ))}
      </ReactSimplyCarousel>

      <Divider
        aria-hidden="true"
        sx={{
          opacity: 1,
          borderColor: "white",
          borderWidth: 2,
          width: "100%",
          alignSelf: "center",
          marginTop: "1rem",
          marginBottom: "0rem",
        }}
      />
    </div>
  );
}

type SectionProps = {
  LabSectionRow: LabSectionRow;
};

function LabSectionRowComponent(props: SectionProps) {
  const { LabSectionRow } = props;

  // Check if Description is not null and has at least one entry
  const description = LabSectionRow.Description
    ? LabSectionRow.Description[0]
    : null;

  return (
    <div className="w-[70vw] xl:w-[30vw] mb-10 lg:px-5 ">
      <img
        src={`https://factorystrapi.mcgilleus.ca${LabSectionRow.Image.data.attributes.url}`}
        alt=""
        loading="lazy"
        className="w-full object-cover rounded-2xl h-[370px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      />

      {description ? (
        <ul className="ml-5 md:ml-10">
          {description.children?.map((child, index) => {
            return child.children && child.children.length > 0 ? (
              <li key={index} className="list-disc my-5 text-lg font-medium">
                {child.children[0].text}
              </li>
            ) : null;
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
