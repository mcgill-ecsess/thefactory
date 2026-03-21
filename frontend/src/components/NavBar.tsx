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
  const [status] = useState<boolean>(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 10 && hour < 17;
  });
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      {/* Mobile Navbar */}
      <nav
        className={`lg:hidden h-16 flex justify-between items-center px-5 sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/60"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-200/30"
        }`}
      >
        <img
          src="/logo/factory_logo_inline.png"
          alt="Factory Logo"
          className="h-8"
        />
        <button
          onClick={props.toggleDrawer}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {props.isDrawerOpen ? (
            <X size={24} color="#374151" />
          ) : (
            <Menu size={24} color="#374151" />
          )}
        </button>
      </nav>

      {/* Desktop Navbar */}
      <header
        className={`hidden lg:block sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/60"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-200/30"
        }`}
      >
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Left: Logo + Nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/logo/factory_logo_inline.png"
                alt="The Factory Logo"
                className="h-9 w-auto -translate-y-1.5"
              />
            </Link>

            <nav className="flex gap-1 items-center">
              {[
                { href: "/", label: "Home" },
                { href: "/office-hours", label: "Office Hours" },
                { href: "/workshops", label: "Workshops" },
                { href: "/our-lab", label: "Our Lab" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                    mounted && pathname === href
                      ? "text-factory-green font-semibold"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              ))}


              
              
            </nav>
          </div>

          {/* Right: Status + Contact */}
          <div className="flex items-center gap-4">
            {mounted && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${status ? "bg-factory-green animate-pulse" : "bg-red-400"}`}
                />
                <span className="text-gray-500 text-xs font-medium">
                  {status ? "Open" : "Closed"}
                </span>
              </div>
            )}
            <button
              onClick={() => setContactPopupOpen(true)}
              className="cursor-pointer text-sm font-medium tracking-wide text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
            >
              Contact Us
            </button>
            <button className="cursor-pointer bg-gradient-to-br from-primary to-primary-container hover:bg-factory-dark-green text-white px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-factory-green/25 active:scale-95">
              Become a Member
            </button>
          </div>
        </div>
      </header>

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
