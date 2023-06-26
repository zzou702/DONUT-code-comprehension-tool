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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendChatPrompt(value);

    // TODO: post sending handling
  }

  return (
    <Panel
      sx={{
        background: "white",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={spacing}>
          <TextField
            value={value}
            onChange={handleChange}
            placeholder="Enter your prompt here."
            // Comment out the below if you want to submit by pressing the Enter key.
            multiline
            rows={3}
          />
          <Button variant="contained" type="submit">
            Send
          </Button>
        </Stack>
      </form>
    </Panel>
  );
}
