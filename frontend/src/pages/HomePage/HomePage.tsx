import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FeatureListComponent from "./FeatureListComponent";

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
      {/* <Box
        sx={{
          flexGrow: 1,
          py: 5,
          px: 10,
          display: "flex",
          flexDirection: "column",
        }}
      > */}
      <Grid container spacing={1} alignItems="left">
        <Grid item xs={12}>
          <Box
            sx={{
              flexGrow: 1,
              py: 5,
              px: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container alignItems="center">
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
                  sx={{ width: 95 }}
                >
                  <Typography
                    variant="body2"
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
                  color="primary"
                  sx={{ width: 95 }}
                >
                  <Typography
                    variant="body2"
                    color="secondary"
                    sx={{ fontFamily: "serif", fontWeight: "bold" }}
                  >
                    Sign Up
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={7}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sx={{ mb: 2 }}>
                        <Typography
                          variant="h5"
                          align="left"
                          sx={{ fontFamily: "Serif", fontWeight: "bold" }}
                        >
                          Unlock the Power of Code comprehension: Master
                          Comprehension and Debugging with AI
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          align="left"
                          sx={{ fontFamily: "Serif", color: "#5e5e5e" }}
                        >
                          Unlock the power of code comprehension with our
                          revolutionary tool designed for students and novices.
                          In an AI-driven era, understanding code logic is
                          essential as AI generates more code. Stay ahead,
                          unleash your potential, and embrace limitless
                          possibilities in programming.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <img
                      src="https://camo.githubusercontent.com/61491d59e71fec5c794945fed916a4a682b6c0404fc31f30b08a0d919c558404/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3537363966633430316236333162616231616464623261622f313534313538303631313632342d5445363451474b524a4738535741495553374e532f6b6531375a77644742546f6464493870446d34386b506f73776c7a6a53564d4d2d53784f703743563539425a772d7a505067646e346a557756634a45315a7657515578776b6d794578676c4e714770304976544a5a616d574c49327a76595748384b332d735f3479737a63703272795449304871544f6161556f68724938504936465879386339505774426c7141566c555335697a7064634958445a71445976707252715a32395077306f2f636f64696e672d667265616b2e676966"
                      width="100%"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  align="left"
                  sx={{ fontFamily: "Serif", color: "#5e5e5e" }}
                >
                  <Button
                    variant="contained"
                    sx={{ mb: 4, width: 150 }}
                    onClick={handleGetStartedButtonClick}
                  >
                    Get Started
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              py: 5,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#5cdb95",
              backgroundColor: "#3aafa9",
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  height="30vh" // Adjust the height as needed
                  justifyContent="center"
                >
                  <Typography
                    variant="h4"
                    align="left"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Code Comprehension Made Easy
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  alignItems="center"
                  height="30vh" // Adjust the height as needed
                  sx={{ mx: 10 }}
                >
                  <FeatureListComponent />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
