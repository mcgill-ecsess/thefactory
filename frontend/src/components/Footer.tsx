"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.facebook.com/ecsessfactory",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/thefactory_mcgill/",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/the-factory-mcgill/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:thefactory@mcgilleus.ca",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="bg-factory-blue border-t border-white/10">
      {/* Mobile */}
      <div className="lg:hidden flex flex-col items-center gap-6 py-8 px-6">
        <img
          src="/logo/factory_logo_inline_white.png"
          alt="The Factory"
          className="h-8 object-contain"
        />
        <div className="flex gap-5">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-factory-green text-white/70 hover:text-white transition-all duration-200"
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
        <p className="text-white/40 text-xs">© 2024 ECSESS Factory</p>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block py-10 px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-10">
              <img
                src="/mcgill-logo.png"
                alt="McGill University"
                className="h-10 object-contain opacity-80"
              />
              <img
                src="/Ecsess-Logo.png"
                alt="ECSESS"
                className="h-10 object-contain opacity-80"
              />
            </div>
            <img
              src="/logo/factory_logo_inline_white.png"
              alt="The Factory"
              className="h-9 object-contain"
            />
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-factory-green text-white/60 hover:text-white transition-all duration-200"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 flex justify-center">
            <p className="text-white/35 text-sm">
              © 2024 ECSESS Factory · McGill University
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
