"use client";

import Image from "next/image";
import {
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

const STRAPI_BASE = "https://factorystrapi.mcgilleus.ca";

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
  const { manager, open, onClose } = props;

  if (!manager) return null;

  const pictureUrl = manager.attributes.picture.data
    ? `${STRAPI_BASE}${manager.attributes.picture.data.attributes.url}`
    : null;

  const initials = `${manager.attributes.First_Name?.charAt(0) ?? ""}${manager.attributes.Last_Name?.charAt(0) ?? ""}`;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogContent className="flex flex-col items-start">
        <Box className="flex flex-row w-full justify-between">
          <Box className="flex flex-row items-center pb-4 gap-4">
            {/* Avatar — fixed 96×96 container to prevent layout shift */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-gray-100">
              {pictureUrl ? (
                <Image
                  src={pictureUrl}
                  alt={manager.attributes.First_Name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                  loading="eager"
                  quality={75}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-factory-green/20 text-factory-green font-bold text-xl select-none">
                  {initials}
                </div>
              )}
            </div>

            <Box className="flex flex-col">
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

          <IconButton className="self-start" onClick={onClose} aria-label="Close">
            <Close />
          </IconButton>
        </Box>

        {manager.attributes.Skills && manager.attributes.Skills.length > 0 ? (
          <>
            <Divider className="w-full" />
            <div className="w-full">
              <Typography variant="h6" className="text-left">
                Skills
              </Typography>
              <div className="flex flex-wrap gap-1 h-fit max-h-48 overflow-y-auto py-2">
                {manager.attributes.Skills.map((skill, index) => (
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
