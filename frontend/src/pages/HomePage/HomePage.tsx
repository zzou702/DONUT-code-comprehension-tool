import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Button, Divider, Icon, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a theme using createTheme
const theme: Theme = createTheme({
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

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedButtonClick = () => {
    navigate("/setup");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          py: 5,
          px: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={5} alignItems="left">
          <Grid item xs={10}>
            <Typography
              variant="h4"
              align="left"
              sx={{ fontFamily: "Monospace", fontWeight: "bold" }}
            >
              Donut Code Comprehension
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              href="/login"
              color="secondary"
              sx={{ width: 100 }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontFamily: "serif", fontWeight: "bold" }}
              >
                Log in
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              href="/register"
              color="secondary"
              sx={{ width: 100 }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontFamily: "serif", fontWeight: "bold" }}
              >
                Sign Up
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ my: 2 }}>
            <Typography variant="h5" align="left" sx={{ fontFamily: "Serif" }}>
              Unlock the Power of Code comprehension: Master Comprehension and
              Debugging with AI
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              align="left"
              sx={{ fontFamily: "Serif", color: "#5e5e5e" }}
            >
              Unlock the power of code comprehension with our revolutionary tool
              designed for students and novices. In an AI-driven era,
              understanding code logic is essential as AI generates more code.
              Stay ahead, unleash your potential, and embrace limitless
              possibilities in programming.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              align="left"
              sx={{ fontFamily: "Serif", color: "#5e5e5e" }}
            >
              <Button
                variant="contained"
                sx={{ my: 4, width: 150 }}
                onClick={handleGetStartedButtonClick}
              >
                Get Started
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
