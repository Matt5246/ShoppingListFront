import { createTheme } from "@mui/material/styles";

export interface Theme {
  palette: {
    mode: "light" | "dark";
    background?: {
      default?: string;
      paper?: string;
    };
  };
  // add other properties as needed
}

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#1E1E1E",
    },
  },
});
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
  },
});
