"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavDrawerProps = {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/office-hours", label: "Office Hours" },
  { href: "/workshops", label: "Workshops" },
  { href: "/our-lab", label: "Our Lab" },
];

const NavDrawer = (props: NavDrawerProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {props.isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={props.toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-factory-blue z-50 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          props.isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-center pt-12 pb-8 px-6 border-b border-white/10">
          <img
            src="/logo/factory_logo_inline_white.png"
            alt="Factory Logo"
            className="h-10"
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 px-3 pt-4 flex-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={props.toggleDrawer}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-factory-green/20 text-factory-green"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-factory-green shrink-0" />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Contact footer */}
        <div className="p-4 border-t border-white/10">
          <a
            href="mailto:thefactory@mcgilleus.ca"
            onClick={props.toggleDrawer}
            className="flex flex-col items-center gap-1 bg-factory-green hover:bg-factory-dark-green text-white rounded-xl p-4 text-center transition-all duration-200 active:scale-95"
          >
            <span className="font-semibold text-sm">Contact Us</span>
            <span className="text-xs font-mono opacity-80">
              thefactory@mcgilleus.ca
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavDrawer;
