import { Theme, createTheme } from "@mui/material";

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#222222",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#222222",
    },
  },
});
