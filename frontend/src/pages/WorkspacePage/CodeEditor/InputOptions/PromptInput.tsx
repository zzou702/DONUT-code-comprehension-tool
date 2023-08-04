import { Stack, Typography, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Panel from "../../../../components/Panel";
import InputOptionState from "../../../../models/InputOptionState";
import { spacing } from "../../SharedStyles";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function PromptInput() {
  const { setPrompt, setInputOptionState } = useContext(WorkspaceContext);

  const [value, setValue] = useState("");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    if (value.trim() == "") {
      alert("Please enter a prompt.");
      return;
    }
    setPrompt(value);
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
          placeholder="Generate a program that performs binary search."
        />
        <Stack spacing={spacing} direction="row">
          <Button variant="outlined" onClick={handleBack} fullWidth>
            Back
          </Button>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Panel>
  );
}
