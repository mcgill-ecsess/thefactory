"use client";

import {
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Link,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { FactoryManager } from "../types/FactoryManager";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function ManagerInfo(props: {
  manager: FactoryManager | null;
  open: boolean;
  onClose: () => void;
}) {
  // Destructure props for cleaner access
  const { manager, open, onClose } = props;

  // Return early if manager is null to avoid rendering unnecessary content
  if (!manager) {
    return null;
  }



  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogContent className="flex flex-col items-start">
        <Box className="flex flex-row w-full justify-between">
          <Box className="flex flex-row items-center pb-4">
            {manager.attributes.picture.data ? (
              <Avatar
                alt={manager.attributes.First_Name}
                src={`https://factorystrapi.mcgilleus.ca${manager.attributes.picture.data.attributes.url}`}
                sx={{ width: "6rem", height: "6rem" }}
              />
            ) : (
              <Avatar
                alt={manager.attributes.First_Name}
                src="/static/images/avatar/1.jpg"
                sx={{ width: "6rem", height: "6rem" }}
              />
            )}

            <Box className="flex flex-col ml-4">
              <Typography variant="h6">
                {manager.attributes.First_Name} {manager.attributes.Last_Name}
              </Typography>
              <Typography variant="caption">
                {manager.attributes.Role}
              </Typography>
              <Typography variant="caption">
                {manager.attributes.Year_Major}
              </Typography>

              {manager.attributes.Office_Hour_Day ? (
                <Typography variant="caption">
                  Office Hours: {manager.attributes.Office_Hour_Day},{" "}
                  {formatTime(manager.attributes.Start_Time)} -{" "}
                  {formatTime(manager.attributes.End_Time)}
                </Typography>
              ) : null}

              <Link
                color="#4ca981"
                underline="hover"
                href={`mailto:${manager.attributes.McGill_Email}`}
              >
                <Typography variant="caption">
                  {manager.attributes.McGill_Email}
                </Typography>
              </Link>
            </Box>
          </Box>
          <IconButton className="self-start" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {props.manager?.attributes.Skills &&
        props.manager?.attributes.Skills.length > 0 ? (
          <>
            <Divider className="w-full" />
            <div className="w-full">
              <Typography variant="h6" className="text-left">
                Skills
              </Typography>
              <div className="flex flex-wrap gap-1 h-fit max-h-48 overflow-scroll py-2">
                {props.manager?.attributes.Skills?.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-center"
                    label={skill.skill}
                    onClick={() => undefined}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
