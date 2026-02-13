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
      
      
        let isFutureWorkshop = false;
        if(workshopStartDateTime > new Date()){
           isFutureWorkshop = true;
        }
       

        return (
          <Accordion
            key={workshop.id}
            disableGutters={true}
            sx={props.sx}
            className="w-full pb-3"
          >
            <AccordionSummary
              expandIcon={
                <div className="flex flex-row items-center">
                  <ExpandMoreOutlined />
                </div>
              }
              className="p-0 m-0"
            >
              <Box
                component="img"
                src={`https://factorystrapi.mcgilleus.ca${workshop.attributes.CoverPicture.data[0].attributes.url}`}
                className="h-24 w-24 rounded-sm aspect-square contain-content "
              />
              <Box className="flex flex-col pl-4 gap-1">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-medium">
                  {workshop.attributes.WorkshopTitle}
                </h4>
                <Typography>{eventDetails}</Typography>
                <div className="flex md:gap-7 gap-1 md:flex-row flex-col mt-1">
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
                      <p className="flex gap-2 mt-1 items-center font-bold text-factory-green text-sm">
                        <Presentation size={20} />
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
                      <p className="flex gap-2 mt-1 items-center font-bold text-factory-green text-sm">
                        <UserRoundCheck size={20} />
                        Sign Up Form
                      </p>
                    </Link>
                  )}
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="pt-4">
              <Typography variant="h6" className="text-left">
                Details
              </Typography>
              <Typography className="text-left">
                {workshop.attributes.Details}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
