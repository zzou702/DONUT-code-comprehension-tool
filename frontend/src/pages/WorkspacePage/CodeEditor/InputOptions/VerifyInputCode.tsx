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
    setInputOptionState(InputOptionState.COMPLETE);
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
            fontSize: "12px",
          }}
        >
          Generate Questions
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "12px",
          }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Stack>
    </Panel>
  );
}
