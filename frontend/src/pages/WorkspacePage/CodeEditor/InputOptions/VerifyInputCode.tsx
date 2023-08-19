import { Button, Stack, Typography } from "@mui/material";
import { spacing } from "../../SharedStyles";
import Panel from "../../../../components/Panel";
import ProgramGenState from "../../../../models/ProgramGenState";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function VerifyInputCode() {
  const { editor, setProgramGenState, clearQuestions, generateQuestions } =
    useContext(WorkspaceContext);

  async function handleGenerate() {
    setProgramGenState(ProgramGenState.COMPLETE);
    clearQuestions();
    await generateQuestions();
    // saveQuestions();
  }

  function handleBack() {
    // const confirmBack = confirm(
    //   "Are you sure you want to go back to the program generation menu?"
    // );

    // if (confirmBack) {
    setProgramGenState(ProgramGenState.UNSELECTED);
    // }
  }

  function hasInput() {
    return editor?.getValue().trim() == "";
  }

  return (
    <Panel
      sx={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",

        padding: spacing * 0.75,

        background: "white",
      }}
    >
      <Stack spacing={spacing * 0.75}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={hasInput()}
          sx={{
            fontSize: "14px",
            textTransform: "none",
          }}
        >
          Generate Questions
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "14px",
            textTransform: "none",
          }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Stack>
    </Panel>
  );
}
