"use client";

import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { LoginContext } from "@/Contexts/LoginContext";
import { ManagerAndLabProvider } from "@/Contexts/ManagerAndLabContext";
import { InventoryProvider } from "@/Contexts/InventoryContext";

export default function Providers({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <ManagerAndLabProvider>
        <InventoryProvider>
          {children}
          <Toaster />
        </InventoryProvider>
      </ManagerAndLabProvider>
    </LoginContext.Provider>
  );
}

