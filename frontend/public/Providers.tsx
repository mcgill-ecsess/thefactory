"use client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import theme from "../src/theme";
import { LoginContext } from "../src/Contexts/LoginContext";
import { ManagerAndLabProvider } from "../src/Contexts/ManagerAndLabContext";
import { InventoryProvider } from "../src/Contexts/InventoryContext";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        <ManagerAndLabProvider>
          <InventoryProvider>
            {children}
            <Toaster />
          </InventoryProvider>
        </ManagerAndLabProvider>
      </LoginContext.Provider>
    </ThemeProvider>
  );
}