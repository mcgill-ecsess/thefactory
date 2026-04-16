"use client";

import { Avatar } from "@mui/material";
import { FactoryManager } from "../types/FactoryManager";

export default function ManagerCard(props: {
  manager: FactoryManager;
  onClick: (managerDTO: FactoryManager) => void;
}) {
  const { manager } = props;
  const pictureUrl = manager.attributes.picture.data
    ? `https://factorystrapi.mcgilleus.ca${manager.attributes.picture.data.attributes.url}`
    : undefined;

  return (
    <button
      onClick={() => props.onClick(manager)}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/8 transition-all duration-200 w-full text-center"
    >
      <div className="relative">
        <Avatar
          alt={manager.attributes.First_Name}
          src={pictureUrl ?? "/static/images/avatar/1.jpg"}
          sx={{ width: "5rem", height: "5rem" }}
          className="ring-2 ring-transparent group-hover:ring-factory-green transition-all duration-200"
        />
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-white font-semibold text-sm leading-tight">
          {manager.attributes.Modified_First_Name}
        </span>
        <span className="text-white/50 text-xs">
          {manager.attributes.Role}
        </span>
        <span className="text-factory-green text-xs font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View Profile →
        </span>
      </div>
    </button>
  );
}
