import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function PromptEntry() {
  return (
    <Stack
      direction="row"
      sx={{
        border: "1px solid grey",
        borderRadius: "5px",
      }}
    >
      <TextField
        placeholder="Question Prompt"
        fullWidth
        sx={{ border: "none", "& fieldset": { border: "none" } }}
      />
      <Button variant="text">
        <SendIcon />
      </Button>
    </Stack>
  );
}
