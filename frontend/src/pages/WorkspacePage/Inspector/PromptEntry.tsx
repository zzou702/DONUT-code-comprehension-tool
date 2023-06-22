import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Panel from "../../../components/Panel";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import { useContext, useEffect, useRef, useState } from "react";

export default function PromptEntry() {
  const { prompt, setPrompt } = useContext(WorkspaceContext);

  const [value, setValue] = useState(prompt);

  function savePrompt() {
    setPrompt(value);
    alert(`Saved question prompt: "${value}."`);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  return (
    <Panel>
      <Stack direction="row">
        <TextField
          value={value}
          onChange={handleChange}
          placeholder="Question Prompt"
          fullWidth
          sx={{ border: "none", "& fieldset": { border: "none" } }}
        />
        <Button variant="text" onClick={savePrompt}>
          <SendIcon />
        </Button>
      </Stack>
    </Panel>
  );
}
