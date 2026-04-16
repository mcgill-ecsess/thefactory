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
      aria-label={`View profile of ${manager.attributes.First_Name} ${manager.attributes.Last_Name}`}
      className="group flex flex-col items-center gap-3 p-5 rounded-xl w-full text-center
                 hover:bg-white/5 active:bg-white/8 transition-colors duration-150"
    >
      {/* Avatar */}
      <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden shrink-0
                      ring-2 ring-white/10 group-hover:ring-factory-green/60
                      transition-all duration-200 bg-white/5">
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            alt={manager.attributes.First_Name}
            fill
            sizes="72px"
            className="object-cover object-top"
            loading="lazy"
            quality={60}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center
                           text-factory-green font-bold text-xl select-none">
            {manager.attributes.First_Name?.charAt(0) ?? "?"}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-semibold text-sm leading-tight text-balance">
          {manager.attributes.Modified_First_Name ?? manager.attributes.First_Name}
        </span>
        <span className="text-white/40 text-xs leading-snug text-balance">
          {manager.attributes.Role}
        </span>
      </div>
    </button>
  );
}
