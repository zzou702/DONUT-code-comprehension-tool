import { Theme, createTheme } from "@mui/material";

export const theme: Theme = createTheme({
  palette: {
    background: {
      default: "#2b2b2b",
      paper: "#fff",
    },
    primary: {
      main: "#655DC3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5DC380",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "14px",
        },
      },
    },
  },
});
