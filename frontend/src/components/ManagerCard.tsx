"use client";

import Box from "@mui/material/Box";
import { Avatar, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FactoryManager } from "../types/FactoryManager";

export default function ManagerCard(props: {
  manager: FactoryManager;
  onClick: (managerDTO: FactoryManager) => void;
}) {
  return (
    <Box
      className="flex flex-col items-center p-4"
      sx={{
        borderRadius: "0.15rem",
      }}
    >
      {props.manager.attributes.picture.data ? (
        <Avatar
          alt={props.manager.attributes.First_Name}
          src={`https://factorystrapi.mcgilleus.ca${props.manager.attributes.picture.data.attributes.url}`}
          sx={{ width: "6rem", height: "6rem" }}
        />
      ) : (
        <Avatar
          alt={props.manager.attributes.First_Name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: "6rem", height: "6rem" }}
        />
      )}

      <Typography variant="h6" className="text-center">
        {props.manager.attributes.Modified_First_Name}
      </Typography>

      <Typography variant="caption" className="text-center">
        {props.manager.attributes.Role}
      </Typography>
      <Link
        className="text-center"
        underline="hover"
        onClick={() => props.onClick(props.manager)}
        sx={{
          color: "#57bf94",
          "&:hover": {
            color: "#4ca981",
          },
        }}
      >
        <Typography variant="caption" sx={{ color: "#57bf94" }}>
          View Profile
        </Typography>
      </Link>
    </Box>
  );
}
