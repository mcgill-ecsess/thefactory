"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    // Will have 2 footers for the different screen sizes

    <>
      {/* Mobile Version */}
      <div className="flex flex-col lg:hidden bg-blue-gray justify-center items-center gap-9 text-white  w-full bg-factory-blue pt-8 pb-3">
        <img
          src="/logo/factory_logo_inline_white.png"
          alt=""
          className="w-56 object-contain"
        />

        <div className="flex gap-8">
          <a href="https://www.facebook.com/ecsessfactory">
            <Facebook strokeWidth={1.5} size={28} />
          </a>
          <a href="https://www.instagram.com/thefactory_mcgill/">
            <Instagram />
          </a>
          <a href="https://www.linkedin.com/company/the-factory-mcgill/">
            <Linkedin strokeWidth={1.5} size={28} />
          </a>

          <a
            href="mailto:thefactory@mcgilleus.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail strokeWidth={1.5} size={28} />
          </a>
        </div>

        <p className="font-medium">Copyright © ECSESS Factory 2024</p>
      </div>

      {/* Desktop Version */}

      <div className="hidden lg:flex flex-col bg-blue-gray justify-center items-center gap-10  text-white w-full h-[300px] bg-factory-blue">
        <div className="flex gap-32 items-center">
          <img src="/mcgill-logo.png" alt="" className="w-48 object-contain" />
          <img src="/Ecsess-Logo.png" alt="" className="w-48 object-contain" />
        </div>

        <div className="flex gap-72 items-end mt-3">
          {" "}
          <img
            src="/logo/factory_logo_inline_white.png"
            alt=""
            className="w-48 object-contain"
          />
          <p className="font-medium">Copyright © ECSESS Factory 2024</p>
          <div className="flex gap-8 items-center">
            <a
              href="https://www.facebook.com/ecsessfactory"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // For security reasons to prevent tab hijacking
            >
              <Facebook strokeWidth={1.5} size={28} />
            </a>
            <a
              href="https://www.instagram.com/thefactory_mcgill/"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // For security reasons to prevent tab hijacking
            >
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com/company/the-factory-mcgill/"
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // For security reasons to prevent tab hijacking
            >
              <Linkedin strokeWidth={1.5} size={28} />
            </a>

            <a
              href="mailto:thefactory@mcgilleus.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail strokeWidth={1.5} size={28} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
