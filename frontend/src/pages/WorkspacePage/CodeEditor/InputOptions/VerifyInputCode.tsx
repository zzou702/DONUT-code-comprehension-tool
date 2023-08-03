import { Button, Stack, Typography } from "@mui/material";
import { spacing } from "../../SharedStyles";
import Panel from "../../../../components/Panel";
import InputOptionState from "../../../../models/InputOptionState";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function VerifyInputCode() {
  const { editor, setInputOptionState } = useContext(WorkspaceContext);

  function handleGenerate() {
    // TODO: generate q
    return;
  }

  function handleBack() {
    const confirmBack = confirm(
      "Are you sure you want to go back to the program generation menu?"
    );

    if (confirmBack) {
      setInputOptionState(InputOptionState.UNSELECTED);
    }
  }

  function hasInput() {
    return editor?.getValue().trim() == "";
  }

  return (
    <Panel
      sx={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",

        padding: spacing,

        background: "white",
      }}
    >
      <Stack spacing={spacing}>
        <Typography>Enter your code in the editor</Typography>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={hasInput()}
        >
          Generate Questions
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Stack>
    </Panel>
  );
}
