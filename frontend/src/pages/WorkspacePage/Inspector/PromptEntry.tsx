import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Panel from "../../../components/Panel";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { theme } from "../WorkspaceTheme";

export default function PromptEntry() {
  const { questionPrompt, setQuestionPrompt } = useContext(WorkspaceContext);

  const [value, setValue] = useState(questionPrompt);

  function savePrompt() {
    setQuestionPrompt(value);
    alert(`Saved question prompt: "${value}".`);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  return (
    <Panel
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Stack direction="row" sx={{ height: "60px", alignItems: "center" }}>
        <TextField
          value={value}
          onChange={handleChange}
          placeholder="Question Prompt"
          fullWidth
          sx={{
            border: "none",
            "& fieldset": { border: "none" },

            input: {
              color: theme.palette.primary.contrastText,
            },
          }}
        />
        <Button variant="text" onClick={savePrompt}>
          <SendIcon
            sx={{
              color: theme.palette.primary.contrastText,
              fontSize: "medium",
            }}
          />
        </Button>
      </Stack>
    </Panel>
  );
}
