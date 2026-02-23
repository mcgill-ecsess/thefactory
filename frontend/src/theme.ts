import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4ca981", // Factory green for primary color
    },
    text: {
      primary: "#000000", // Default text color
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#4ca981", // Custom indicator color
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent uppercase
          fontWeight: "bold",
          color: "#000000", // Default tab text color
          "&.Mui-selected": {
            color: "#4ca981", // Selected tab text color
          },
          "&:hover": {
            color: "#4ca981", // Hover text color
          },
        },
      },
    },
  },
});

export default theme;
