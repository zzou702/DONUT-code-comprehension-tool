import {
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Panel from "../../../../components/Panel";
import ProgramGenState from "../../../../models/ProgramGenState";
import { spacing } from "../../SharedStyles";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function PromptInput() {
  const {
    setPrompt,
    setProgramGenState,
    programLoading,
    generateProgram,
    clearQuestions,
    generateQuestions,
  } = useContext(WorkspaceContext);

  const [value, setValue] = useState("");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  function hasInput() {
    return value.trim() == "";
  }

  async function handleSubmit() {
    setPrompt(value);
    await generateProgram(value);

    setProgramGenState(ProgramGenState.CUSTOM_CODE);
  }

  function handleBack() {
    const confirmBack = confirm(
      "Are you sure you want to go back to the program generation menu?"
    );

    if (confirmBack) {
      setProgramGenState(ProgramGenState.UNSELECTED);
    }
  }

  return (
    <Panel
      sx={{
        position: "absolute",
        width: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        padding: spacing,

        background: "white",
      }}
    >
      <Stack spacing={spacing}>
        <Typography>Enter the program to generate:</Typography>
        <TextField
          value={value}
          onChange={handleChange}
          multiline
          rows={4}
          disabled={programLoading}
          placeholder="Generate a program that performs binary search."
        />
        <Stack spacing={spacing} direction="row">
          {programLoading ? (
            <CircularProgress
              // Use style instead of sx, as sx is overridden
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          ) : (
            <>
              <Button variant="outlined" onClick={handleBack} fullWidth>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={hasInput()}
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Panel>
  );
}
