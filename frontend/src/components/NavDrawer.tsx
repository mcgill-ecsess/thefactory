"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavDrawerProps = {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
};

const NavDrawer = (props: NavDrawerProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col pb-8 text-white items-center justify-between font-museo-moderno text-[25px] text-cream font-black fixed top-0 left-0 w-96 h-full bg-factory-blue transform ${
        props.isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-col gap-7 items-center">
        <img
          src="/logo/factory_logo_inline_white.png"
          alt=""
          className="h-12 mt-10"
        />
        <Link
          href="/"
          style={{
            color: pathname === "/" ? "#57bf94" : "white",
          }}
          onClick={props.toggleDrawer}
        >
          Home
        </Link>
        <Link
          href="/office-hours"
          style={{
            color: pathname === "/office-hours" ? "#57bf94" : "white",
          }}
          onClick={props.toggleDrawer}
        >
          Office Hours
        </Link>
        <Link
          href="/workshops"
          style={{
            color: pathname === "/workshops" ? "#57bf94" : "white",
          }}
          onClick={props.toggleDrawer}
        >
          Workshops
        </Link>
        <Link
          href="/our-lab"
          style={{
            color: pathname === "/our-lab" ? "#57bf94" : "white",
          }}
          onClick={props.toggleDrawer}
        >
          Our Lab
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 w-full px-6">
        <a
          href="mailto:thefactory@mcgilleus.ca"
          className="bg-factory-green hover:bg-factory-dark-green p-4 rounded-xl text-white text-center w-full transition-colors"
          onClick={props.toggleDrawer}
        >
          <p className="text-lg font-medium">Contact Us</p>
          <p className="text-sm font-mono break-all mt-1">
            thefactory@mcgilleus.ca
          </p>
        </a>
      </div>
    </div>
  );
};

export default NavDrawer;