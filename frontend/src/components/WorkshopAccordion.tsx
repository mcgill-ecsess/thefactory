"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { WorkshopDT } from "../types/WorkshopDT";
import { Presentation, UserRoundCheck } from "lucide-react";

export function WorkshopAccordion(props: {
  workshops: WorkshopDT[];
  sx?: any;
}) {
  const handleSignUp = (event: React.MouseEvent, workshop: WorkshopDT) => {
    event.stopPropagation();
    window.open(workshop.attributes.signupLink, "_blank");
  };

  const handleViewSlides = (event: React.MouseEvent, workshop: WorkshopDT) => {
    event.stopPropagation();
    window.open(workshop.attributes.workshopSlides, "_blank");
  };

  return (
    <Box className="flex flex-col">
      {props.workshops.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/3 px-5 py-10 text-center">
          <p className="text-base text-white/70 font-medium">No workshops in this section yet.</p>
          <p className="text-sm text-white/45 mt-1">Check back soon for new events and resources.</p>
        </div>
      )}
      {props.workshops.map((workshop) => {
        const startDateTime = new Date(
          `${workshop.attributes.Date}T${workshop.attributes.StartTime}`
        );
        const endDateTime = new Date(
          `${workshop.attributes.Date}T${workshop.attributes.EndTime}`
        );

        const formattedDate = startDateTime.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedStartTime = startDateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const formattedEndTime = endDateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const eventDetails = `In ${workshop.attributes.Location} on ${formattedDate} from ${formattedStartTime} to ${formattedEndTime}`;
        const workshopStartDateTime = new Date(
          `${workshop.attributes.Date}T${workshop.attributes.StartTime}`
        );
      
      
        const isFutureWorkshop = workshopStartDateTime > new Date();

        const darkAccordionSx = {
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px !important",
          mb: 1.5,
          "&:before": { display: "none" },
          color: "rgba(255,255,255,0.9)",
          ...props.sx,
        };

        return (
          <Accordion
            key={workshop.id}
            disableGutters={true}
            sx={darkAccordionSx}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={
                <div className="flex flex-row items-center shrink-0 text-white/50">
                  <ExpandMoreOutlined />
                </div>
              }
              className="p-0 m-0 w-full"
              sx={{ "& .MuiAccordionSummary-content": { width: "100%", minWidth: 0 }, px: 2, py: 1.5 }}
            >
              <Box className="flex flex-row items-start gap-3 w-full min-w-0">
                <Box
                  component="img"
                  src={`https://factorystrapi.mcgilleus.ca${workshop.attributes.CoverPicture.data[0].attributes.url}`}
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-sm aspect-square shrink-0 object-cover"
                />
                <Box className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight">
                    {workshop.attributes.WorkshopTitle}
                  </h4>
                  <Typography className="text-sm md:text-base wrap-break-word" sx={{ color: "rgba(255,255,255,0.58)" }}>
                    {eventDetails}
                  </Typography>
                  <div className="flex gap-3 sm:gap-6 flex-row flex-wrap mt-1">
                    {workshop.attributes.workshopSlides && (
                      <Link
                        underline={"hover"}
                        className="self-start"
                        onClick={(event) => handleViewSlides(event, workshop)}
                        sx={{
                          "&:hover": {
                            color: "#57bf94",
                          },
                        }}
                      >
                        <p className="flex gap-2 mt-1 items-center font-semibold text-factory-green text-sm">
                          <Presentation size={16} />
                          View Workshop Slides
                        </p>
                      </Link>
                    )}

                    {workshop.attributes.signupLink && isFutureWorkshop && (
                      <Link
                        underline={"hover"}
                        className="self-start"
                        onClick={(event) => handleSignUp(event, workshop)}
                        sx={{
                          "&:hover": {
                            color: "#57bf94",
                          },
                        }}
                      >
                        <p className="flex gap-2 mt-1 items-center font-semibold text-factory-green text-sm">
                          <UserRoundCheck size={16} />
                          Sign Up Form
                        </p>
                      </Link>
                    )}
                  </div>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Typography variant="h6" className="text-left" sx={{ color: "rgba(255,255,255,0.9)", mb: 0.5, fontSize: "1rem", fontWeight: 600 }}>
                Details
              </Typography>
              <Typography className="text-left" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.65 }}>
                {workshop.attributes.Details}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
