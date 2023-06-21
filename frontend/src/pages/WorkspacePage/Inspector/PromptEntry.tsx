import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Panel from "./Panels/Panel";

export default function PromptEntry() {
  return (
    <Panel>
      <Stack direction="row">
        <TextField
          placeholder="Question Prompt"
          fullWidth
          sx={{ border: "none", "& fieldset": { border: "none" } }}
        />
        <Button variant="text">
          <SendIcon />
        </Button>
      </Stack>
    </Panel>
  );
}
