import { Box, Grid, ThemeProvider } from "@mui/material";
import Inspector from "./Inspector/Inspector";
import CodeEditor from "./CodeEditor/CodeEditor";
import { spacing } from "./SharedStyles";
import { theme } from "./WorkspaceTheme";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";

export default function WorkspacePage() {
  const {
    editor,
    questionStates,
    loadQuestions,
    generateQuestions,
    saveQuestions,
    clearQuestions,
    setCurrentQuestion,
  } = useContext(WorkspaceContext);

  useEffect(() => {
    async function load() {
      // if (!loadQuestions()) {
      //   clearQuestions();

      console.log(editor);
      await generateQuestions();
      //   saveQuestions();
      // }
      // console.log(questionStates);
    }

    load();
  }, [editor]);

  useEffect(() => {
    if (!questionStates) {
      return;
    }
    console.log(questionStates);
    // Set workspace to first question
    setCurrentQuestion(1);
  }, [questionStates]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: spacing,
          boxSizing: "border-box",

          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid container columnSpacing={spacing} sx={{ height: "100%" }}>
          {/* Need to explicitly pass height down to be inherited */}
          <Grid item xs={6} sx={{ height: "inherit" }}>
            <CodeEditor />
          </Grid>
          <Grid item xs={6} sx={{ height: "inherit" }}>
            <Inspector />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
