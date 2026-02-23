"use client";

import { useState, ReactNode } from "react";
import NavBar from "@/components/NavBar";
import NavDrawer from "@/components/NavDrawer";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);


  //ADDS SCROLL,NAVBAR, NAVDRAWER, FOOTER TO THE PAGE
  //THIS IS IMPORTED IN LAYOUT.TSX AND THEN PASSED TO THE CLIENT LAYOUT COMPONENT
  // React broooooo
  return (
    <>
      <ScrollToTop />
      <NavBar toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <NavDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      {children}
      <Footer />
    </>
  );
}
