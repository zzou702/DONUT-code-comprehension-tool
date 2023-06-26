import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Panel from "../../../../../components/Panel";
import { Button, Stack, TextField } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function InputBox() {
  const { sendChatPrompt } = useContext(WorkspaceContext);

  const [value, setValue] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  async function handleSubmit() {
    await sendChatPrompt(value);

    // TODO: post sending handling
  }

  return (
    <Panel
      sx={{
        background: "white",
      }}
    >
      <Stack spacing={spacing}>
        <TextField
          value={value}
          onChange={handleChange}
          multiline
          rows={2}
          placeholder="Enter your prompt here."
        />
        <Button variant="contained" onClick={handleSubmit}>
          Send
        </Button>
      </Stack>
    </Panel>
  );
}
