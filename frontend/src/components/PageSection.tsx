"use client";

import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import theme from "@/theme";

export function PageSection(props: {
  title: string;
  color?: string;
  children: React.ReactNode;
  sx?: any;
  className?: string;
}) {
  return (
    <ThemeProvider theme={theme}>
      <PageSectionInner {...props} />
    </ThemeProvider>
  );
}

function PageSectionInner(props: {
  title: string;
  color?: string;
  children: React.ReactNode;
  sx?: any;
  className?: string;
}) {
  const theme = useTheme();
  const isLight = props.color !== "white";
  const titleColor =
    props.color === "white"
      ? theme.palette.common.white
      : props.color === "black"
      ? "#000000"
      : theme.palette.common.black;

  return (
    <Box
      className={
        "w-full max-w-7xl flex flex-col justify-center" +
        (props.className ? " " + props.className : "")
      }
      sx={props.sx}
    >
      {/* Title */}
      <h2
        style={{ color: titleColor }}
        className="text-center text-4xl md:text-5xl font-bold tracking-tight"
      >
        {props.title}
      </h2>

      {/* Accent divider */}
      <div
        style={{
          background: isLight
            ? "linear-gradient(90deg, #57bf94, #4ca981)"
            : "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.5))",
        }}
        className="w-12 h-[3px] rounded-full mx-auto mt-3 mb-6"
      />

      {props.children}
    </Box>
  );
}
