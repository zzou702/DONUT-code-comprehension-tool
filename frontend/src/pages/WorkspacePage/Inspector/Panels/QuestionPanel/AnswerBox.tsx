import { Button, Stack, TextField, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import { useEffect, useState } from "react";

export default function AnswerBox() {
  const [value, setValue] = useState("");

  useEffect(() => {
    // TODO: retrieve answer saved in local storage
    return;
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  function submitAnswer() {
    // TODO: request to check answer
    alert(`Submitted answer: "${value}"`);
  }

  return (
    <Panel
      sx={{
        background: "white",
        p: spacing,
      }}
    >
      <Stack spacing={spacing}>
        <Stack direction="row">
          <Typography sx={{ fontWeight: "bold", px: spacing }}>2.</Typography>
          <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
            What are the path parameters passed to the API call?
          </Typography>
        </Stack>
        <TextField
          value={value}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="Type your answer here."
        />
        <Button variant="contained" onClick={submitAnswer}>
          Submit Answer
        </Button>
      </Stack>
    </Panel>
  );
}
