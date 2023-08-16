import { Box, Grid, IconButton, ThemeProvider } from "@mui/material";
import Inspector from "./Inspector/Inspector";
import CodeEditor from "./CodeEditor/CodeEditor";
import { spacing } from "./SharedStyles";
import { theme } from "./WorkspaceTheme";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";
import TutorialModal from "./TutorialModal";
import InfoButton from "./InfoButton";

// Whether to generate questions immediately when the page is loaded.
const generateOnLoad = false;

export default function WorkspacePage() {
  const {
    editor,
    questionStates,
    loadQuestions,
    generateQuestions,
    saveQuestions,
    clearQuestions,
    setCurrentQuestion,
    isTutorialOpen,
  } = useContext(WorkspaceContext);

  useEffect(() => {
    async function load() {
      // Check editor has mounted, as questions are generated immediately on loading page TODO: change this
      if (!editor) {
        return;
      }
      // if (!loadQuestions()) {
      //   clearQuestions();

      console.log(editor);
      await generateQuestions();
      //   saveQuestions();
      // }
      // console.log(questionStates);
    }

    if (generateOnLoad) {
      load();
    }
  }, [editor]);

  useEffect(() => {
    if (!questionStates) {
      return;
    }
    // Set workspace to first question
    setCurrentQuestion(1);
  }, [questionStates]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          zIndex: 0,
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
      <InfoButton />
      {isTutorialOpen && <TutorialModal />}
    </ThemeProvider>
  );
}
