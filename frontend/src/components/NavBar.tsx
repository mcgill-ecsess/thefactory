import { useContext, useEffect, useState } from "react";
import { Menu, X, Copy } from "lucide-react"; // Import the Copy icon
import { LoginContext } from "../Contexts/LoginContext";
import { NavLink } from "react-router-dom";

type NavBarProps = {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
};

function NavBar(props: NavBarProps) {
  const loginContext = useContext(LoginContext); // Access LoginContext
  const [status, setStatus] = useState<boolean>();
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check token validity and update context on component mount
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY; // Access the API key from .env file

    fetch("https://factorystrapi.mcgilleus.ca/api/open-status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use the API key in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.attributes.status);
        setStatus(data.data.attributes.status);
      })
      .catch((error) => console.log(error));
  });

  const openContactPopup = () => {
    setContactPopupOpen(true);
  };

  const closeContactPopup = () => {
    setContactPopupOpen(false);
    setCopied(false); // Reset copied state when closing popup
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("thefactory@mcgilleus.ca");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-factory-blue h-20 flex justify-between py-3 pl-9 sticky top-0 left-0 right-0 z-50">
        <img
          src="/logo/factory_logo_inline_white.png"
          alt="Factory Logo"
          className="h-12"
        />
        <div className="lg:hidden cursor-pointer bg-dark-brown p-2 mr-4">
          <button
            onClick={props.toggleDrawer}
            className="transition-transform duration-1000 ease-in-out"
          >
            {props.isDrawerOpen ? (
              <X size={44} color="#ffffff" />
            ) : (
              <Menu size={44} color="#ffffff" />
            )}
          </button>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="h-24 bg-factory-blue hidden lg:flex justify-between px-12 font-medium top-0 left-0 right-0 z-50">
        <div className="flex gap-3 text-white items-center h-full">
          <img src="/factory_logo_512x512.png" alt="" className="w-14 mb-4" />
          <h1 className="text-white text-4xl font-medium">The Factory</h1>
          <div className="flex gap-3 font-medium mt-1 ml-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#57bf94] underline decoration-[#57bf94] decoration-[3px] underline-offset-4"
                  : "text-white hover:text-[#57bf94] hover:underline hover:decoration-[#57bf94] hover:decoration-[3px] hover:underline-offset-4"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/office-hours"
              className={({ isActive }) =>
                isActive
                  ? "text-[#57bf94] underline decoration-[#57bf94] decoration-[3px] underline-offset-4"
                  : "text-white hover:text-[#57bf94] hover:underline hover:decoration-[#57bf94] hover:decoration-[3px] hover:underline-offset-4"
              }
            >
              Office Hours
            </NavLink>

            <NavLink
              to="/workshops"
              className={({ isActive }) =>
                isActive
                  ? "text-[#57bf94] underline decoration-[#57bf94] decoration-[3px] underline-offset-4"
                  : "text-white hover:text-[#57bf94] hover:underline hover:decoration-[#57bf94] hover:decoration-[3px] hover:underline-offset-4"
              }
            >
              Workshops
            </NavLink>

            <NavLink
              to="/our-lab"
              className={({ isActive }) =>
                isActive
                  ? "text-[#57bf94] underline decoration-[#57bf94] decoration-[3px] underline-offset-4"
                  : "text-white hover:text-[#57bf94] hover:underline hover:decoration-[#57bf94] hover:decoration-[3px] hover:underline-offset-4"
              }
            >
              Our Lab
            </NavLink>

            {/* Only show Members and Inventory links if logged in */}
            {loginContext?.isLoggedIn && (
              <>
                <NavLink to="/members" className="nav-link">
                  Members
                </NavLink>
                <NavLink to="/inventory" className="nav-link">
                  Inventory
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="gap-5 flex items-center">
          <div className="flex items-center gap-2 text-white  decoration-[#57bf94]">
            <button
              onClick={openContactPopup}
              className="bg-factory-green py-2 px-7 rounded-xl text-white flex gap-2 hover:bg-factory-dark-green"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Us Popup */}
      {contactPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <button
                onClick={closeContactPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Feel free to reach out to us at:
            </p>
            <div className="bg-gray-100 p-3 rounded-md text-center relative"> {/* Added margin-bottom to reserve space */}
              <p className="text-lg font-mono text-factory-green">
                thefactory@mcgilleus.ca
              </p>
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-factory-green transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={18} />
              </button>
            </div>
            {/* Fixed height container for feedback message */}
            <div className="h-3 mb-2 mt-3"> {/* Fixed height container */}
              {copied && (
                <p className="text-factory-green text-sm text-center">
                  Email copied to clipboard!
                </p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeContactPopup}
                className="bg-factory-green text-white py-2 px-4 rounded-md hover:bg-factory-dark-green"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
