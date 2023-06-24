import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Divider,
  Icon,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

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

interface Mode {
  name: string;
  isSelected?: boolean;
}

interface InputOptions {
  name: string;
  isSelected?: boolean;
}

export default function QuizSetupPage() {
  const [pasteCode, setPasteCode] = useState<string>("");
  const [promptContext, setPromptContext] = useState<string>("");
  const [promptDetails, setPromptDetails] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const navigate = useNavigate();

  const [modeSelected, setModeSelected] = useState<Mode>({
    name: "",
    isSelected: false,
  });

  const [inputOptionSelected, setInputOptionSelected] = useState<InputOptions>({
    name: "",
    isSelected: false,
  });

  const handlePracticeClick = () => {
    setModeSelected({ name: "practice", isSelected: true });
  };

  const handleTestClick = () => {
    setModeSelected({ name: "test", isSelected: true });
  };

  const handlePasteCodeClick = () => {
    setInputOptionSelected({ name: "pasteCode", isSelected: true });
  };

  const handlePromptClick = () => {
    setInputOptionSelected({ name: "prompt", isSelected: true });
  };

  const handleTopicClick = () => {
    setInputOptionSelected({ name: "topic", isSelected: true });
  };

  const handelNextButtonClick = () => {
    console.log("Next button clicked");
    console.log("Mode selected: " + modeSelected.name);
    console.log("Input option selected: " + inputOptionSelected.name);
    console.log("Paste code: " + pasteCode);
    console.log("Prompt context: " + promptContext);
    console.log("Prompt details: " + promptDetails);
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          py: 2,
          px: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={1}>
            <IconButton size="large" onClick={handleBackButtonClick}>
              <ChevronLeftIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontFamily: "Monospace", fontWeight: "bold" }}
            >
              Quiz options
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large">
              <AccountCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="left"
              sx={{ fontFamily: "serif", fontWeight: "bold" }}
            >
              Select a mode:
            </Typography>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={6} alignContent={"center"}>
            <Box
              sx={{
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {modeSelected.name === "practice" ? (
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 300,
                    backgroundColor: "#222222",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add box shadow
                    "&:hover": {
                      backgroundColor: "#2e2e2e",
                      cursor: "pointer",
                    },
                  }}
                  onClick={handlePracticeClick}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="secondary"
                    sx={{ fontFamily: "Monospace", mb: 3, fontWeight: "bold" }}
                  >
                    Practice
                  </Typography>
                  <Box>
                    <SchoolIcon fontSize="large" color="secondary" />
                  </Box>
                  <Typography
                    variant="body1"
                    align="left"
                    color="secondary"
                    sx={{ fontFamily: "Monospace" }}
                  >
                    <ul>
                      <li>Answer each question individually</li>
                      <li>Generate more questions freely</li>
                      <li>No time limit</li>
                    </ul>
                  </Typography>
                </Button>
              ) : (
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 300,
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add box shadow
                    "&:hover": {
                      backgroundColor: "#e6e6e6",
                      cursor: "pointer",
                    },
                  }}
                  onClick={handlePracticeClick}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="primary"
                    sx={{ fontFamily: "Monospace", mb: 3, fontWeight: "bold" }}
                  >
                    Practice
                  </Typography>
                  <Box>
                    <SchoolIcon fontSize="large" />
                  </Box>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ fontFamily: "Monospace" }}
                  >
                    <ul>
                      <li>Answer each question individually</li>
                      <li>Generate more questions freely</li>
                      <li>No time limit</li>
                    </ul>
                  </Typography>
                </Button>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={5}
            alignContent={"center"}
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            <Box
              sx={{
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {modeSelected.name === "test" ? (
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 300,
                    backgroundColor: "#222222",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add box shadow
                    "&:hover": {
                      backgroundColor: "#2e2e2e",
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleTestClick}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="secondary"
                    sx={{ fontFamily: "Monospace", mb: 3, fontWeight: "bold" }}
                  >
                    Test
                  </Typography>
                  <Box>
                    <AssessmentIcon fontSize="large" color="secondary" />
                  </Box>
                  <Typography
                    variant="body1"
                    align="left"
                    color="secondary"
                    sx={{ fontFamily: "Monospace" }}
                  >
                    <ul>
                      <li>Answer each question individually</li>
                      <li>5 questions in total</li>
                      <li>Time limit based on the program</li>
                    </ul>
                  </Typography>
                </Button>
              ) : (
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 300,
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add box shadow
                    "&:hover": {
                      backgroundColor: "#e3e3e3",
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleTestClick}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    color="primary"
                    sx={{ fontFamily: "Monospace", mb: 3, fontWeight: "bold" }}
                  >
                    Test
                  </Typography>
                  <Box>
                    <AssessmentIcon fontSize="large" />
                  </Box>
                  <Typography
                    variant="body1"
                    align="left"
                    color="primary"
                    sx={{ fontFamily: "Monospace" }}
                  >
                    <ul>
                      <li>Answer each question individually</li>
                      <li>5 questions in total</li>
                      <li>Time limit based on the program</li>
                    </ul>
                  </Typography>
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>

          {modeSelected.isSelected === false || modeSelected.name === "test" ? (
            <></>
          ) : (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  sx={{ fontFamily: "serif", fontWeight: "bold" }}
                >
                  Input Options:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="text"
                  sx={{
                    borderRadius: 2,
                    width: 300,
                    height: 50,
                    backgroundColor:
                      inputOptionSelected.name === "pasteCode"
                        ? "#222222"
                        : "#ffffff",
                    "&:hover": {
                      backgroundColor:
                        inputOptionSelected.name === "pasteCode"
                          ? "#2e2e2e"
                          : "e3e3e3",
                    },
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", // Add box shadow
                  }}
                  onClick={handlePasteCodeClick}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "serif",
                      fontWeight: "bold",
                      color:
                        inputOptionSelected.name === "pasteCode"
                          ? "#ffffff"
                          : "#222222",
                    }}
                  >
                    Paste Your Code
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="text"
                  sx={{
                    borderRadius: 2,
                    width: 300,
                    height: 50,
                    backgroundColor:
                      inputOptionSelected.name === "prompt"
                        ? "#222222"
                        : "#ffffff",
                    "&:hover": {
                      backgroundColor:
                        inputOptionSelected.name === "prompt"
                          ? "#2e2e2e"
                          : "e3e3e3",
                    },
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", // Add box shadow
                  }}
                  onClick={handlePromptClick}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "serif",
                      fontWeight: "bold",
                      color:
                        inputOptionSelected.name === "prompt"
                          ? "#ffffff"
                          : "#222222",
                    }}
                  >
                    Enter a Prompt
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="text"
                  sx={{
                    borderRadius: 2,
                    width: 300,
                    height: 50,
                    backgroundColor:
                      inputOptionSelected.name === "topic"
                        ? "#222222"
                        : "#ffffff",
                    "&:hover": {
                      backgroundColor:
                        inputOptionSelected.name === "topic"
                          ? "#2e2e2e"
                          : "e3e3e3",
                    },
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)", // Add box shadow
                  }}
                  onClick={handleTopicClick}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "serif",
                      fontWeight: "bold",
                      color:
                        inputOptionSelected.name === "topic"
                          ? "#ffffff"
                          : "#222222",
                    }}
                  >
                    Choose From Topics
                  </Typography>
                </Button>
              </Grid>
            </>
          )}

          {inputOptionSelected.isSelected === false ||
          modeSelected.name === "test" ? (
            <></>
          ) : (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              {inputOptionSelected.name === "pasteCode" ? (
                <>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontFamily: "serif", fontWeight: "bold" }}
                    >
                      Paste Your Code
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={15}
                      placeholder="Enter your code here:"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setPasteCode(e.target.value)}
                    />
                  </Grid>
                </>
              ) : inputOptionSelected.name === "prompt" ? (
                <>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontFamily: "serif", fontWeight: "bold" }}
                    >
                      Enter a Prompt
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        variant="h6"
                        align="left"
                        sx={{
                          fontFamily: "serif",
                          fontWeight: "bold",
                          mr: 4,
                        }}
                      >
                        Generate a program in the programming language:
                      </Typography>

                      <TextField
                        placeholder="E.g. Python"
                        variant="outlined"
                        onChange={(e) => setPromptContext(e.target.value)}
                        sx={{ minWidth: 240 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontFamily: "serif", fontWeight: "bold", my: 1 }}
                    >
                      That does:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={7}
                      placeholder="Enter your prompt here E.g. the functionality of the program. Include as much details as possible"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setPromptDetails(e.target.value)}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    align="left"
                    sx={{ fontFamily: "serif", fontWeight: "bold" }}
                  >
                    Choose From Topics
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ my: 4, width: 150 }}
                  onClick={handelNextButtonClick}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "serif", fontWeight: "bold" }}
                  >
                    Next
                  </Typography>
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
