"use client";

import Image from "next/image";
import { FactoryManager } from "../types/FactoryManager";

const STRAPI_BASE = "https://factorystrapi.mcgilleus.ca";

export default function ManagerCard(props: {
  manager: FactoryManager;
  onClick: (managerDTO: FactoryManager) => void;
}) {
  const { manager } = props;
  const pictureUrl = manager.attributes.picture.data
    ? `${STRAPI_BASE}${manager.attributes.picture.data.attributes.url}`
    : null;

  return (
    <button
      onClick={() => props.onClick(manager)}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/8 transition-all duration-200 w-full text-center"
    >
      {/* Avatar with fixed aspect ratio container to prevent layout shift */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-factory-green transition-all duration-200 shrink-0 bg-white/10">
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            alt={manager.attributes.First_Name}
            fill
            sizes="80px"
            className="object-cover object-top"
            loading="lazy"
            quality={60}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-factory-green/20 text-factory-green font-bold text-lg select-none">
            {manager.attributes.First_Name?.charAt(0) ?? "?"}
          </div>
        )}
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
