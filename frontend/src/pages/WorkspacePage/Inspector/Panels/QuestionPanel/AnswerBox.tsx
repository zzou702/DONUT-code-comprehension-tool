import { Button, Stack, TextField, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function AnswerBox() {
  const { currentQuestion, submitAnswer } = useContext(WorkspaceContext);

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

  function handleSubmit() {
    // TODO: request to check answer
    alert(`Submitted answer: "${value}"`);

    // TODO: implement
    // submitAnswer(value);
  }

  return (
    <Panel
      sx={{
        background: "white",
      }}
    >
      {currentQuestion && (
        <Stack spacing={spacing}>
          <Stack direction="row">
            <Typography
              sx={{ fontWeight: "bold", px: spacing, textAlign: "right" }}
            >
              Question {currentQuestion.number}:
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {currentQuestion.question.description}
            </Typography>
          </Stack>
          <TextField
            value={value}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder="Type your answer here."
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit Answer
          </Button>
        </Stack>
      )}
    </Panel>
  );
}
