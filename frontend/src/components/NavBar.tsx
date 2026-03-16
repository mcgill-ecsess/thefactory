"use client";

import { useContext, useEffect, useState } from "react";
import { Menu, X, Copy, Check } from "lucide-react";
import { LoginContext } from "../Contexts/LoginContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavBarProps = {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
};

function NavBar(props: NavBarProps) {
  const loginContext = useContext(LoginContext);
  const [status, setStatus] = useState<boolean>();
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
    fetch("https://factorystrapi.mcgilleus.ca/api/open-status", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
      .then((r) => r.json())
      .then((data) => setStatus(data.data.attributes.status))
      .catch(console.error);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("thefactory@mcgilleus.ca");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClass = (path: string) =>
    mounted && pathname === path
      ? "text-factory-green font-semibold"
      : "text-white/80 hover:text-white transition-colors duration-200";

  return (
    <>
      {/* Mobile Navbar */}
      <nav
        className={`lg:hidden h-16 flex justify-between items-center px-5 sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-factory-blue/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-factory-blue"
        }`}
      >
        <img
          src="/logo/factory_logo_inline_white.png"
          alt="Factory Logo"
          className="h-9"
        />
        <button
          onClick={props.toggleDrawer}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {props.isDrawerOpen ? (
            <X size={24} color="#ffffff" />
          ) : (
            <Menu size={24} color="#ffffff" />
          )}
        </button>
      </nav>

      {/* Desktop Navbar */}
      <nav
        className={`h-[72px] hidden lg:flex justify-between items-center px-10 sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-factory-blue/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-factory-blue"
        }`}
      >
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/factory_logo_512x512.png" alt="" className="w-9 h-9" />
            <span className="text-white text-xl font-semibold tracking-tight">
              The Factory
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/office-hours", label: "Office Hours" },
              { href: "/workshops", label: "Workshops" },
              { href: "/our-lab", label: "Our Lab" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${navLinkClass(href)} hover:bg-white/10`}
              >
                {label}
              </Link>
            ))}

            {loginContext?.isLoggedIn && (
              <>
                <Link
                  href="/members"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${navLinkClass("/members")} hover:bg-white/10`}
                >
                  Members
                </Link>
                <Link
                  href="/inventory"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${navLinkClass("/inventory")} hover:bg-white/10`}
                >
                  Inventory
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right: Status + Contact */}
        <div className="flex items-center gap-3">
          {mounted && status !== undefined && (
            <div className="flex items-center gap-1.5 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${status ? "bg-factory-green animate-pulse" : "bg-red-400"}`}
              />
              <span className="text-white/60 text-xs">
                {status ? "Open" : "Closed"}
              </span>
            </div>
          )}
          <button
            onClick={() => setContactPopupOpen(true)}
            className="bg-factory-green hover:bg-factory-dark-green text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-factory-green/25 active:scale-95"
          >
            Contact Us
          </button>
        </div>
      </nav>

      {/* Contact Popup */}
      {contactPopupOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setContactPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
              <button
                onClick={() => setContactPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Reach out to us at:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
              <span className="font-mono text-factory-green text-sm font-semibold">
                thefactory@mcgilleus.ca
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-3 p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-factory-green transition-all"
                title="Copy to clipboard"
              >
                {copied ? <Check size={16} className="text-factory-green" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && (
              <p className="text-factory-green text-xs text-center mt-2">
                Copied to clipboard!
              </p>
            )}
            <button
              onClick={() => setContactPopupOpen(false)}
              className="w-full mt-5 bg-factory-green hover:bg-factory-dark-green text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
