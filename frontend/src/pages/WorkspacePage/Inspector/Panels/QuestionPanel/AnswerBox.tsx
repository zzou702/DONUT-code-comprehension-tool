import { Button, Stack, TextField, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function AnswerBox() {
  const { currentQuestion, submitAnswer } = useContext(WorkspaceContext);

  const [value, setValue] = useState("");

  // useEffect(() => {
  //   // TODO: retrieve answer saved in local storage
  //   setValue(
  //     sessionStorage.getItem(currentQuestion.question.description + "answer") ||
  //       ""
  //   );
  //   return;
  // }, [currentQuestion]);
  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.question &&
      currentQuestion.question.description
    ) {
      setValue(
        sessionStorage.getItem(
          currentQuestion.question.description + "answer"
        ) || ""
      );
    }
    return;
  }, [currentQuestion]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
    sessionStorage.setItem(
      currentQuestion.question.description + "answer",
      event.target.value
    );
  }

  function handleSubmit() {
    // TODO: request to check answer
    alert(`Submitted answer: "${value}"`);

    // TODO: implement
    // submitAnswer(value);
  }

  function handleFeedback() {
    // TODO: implement
    // const confirmClear = confirm(
    //   "Are you sure you want to clear this answer?\n\nAny generated feedback for this question will also be cleared."
    // );
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
          <Stack direction="row" spacing={spacing}>
            <Button
              variant="outlined"
              onClick={handleFeedback}
              fullWidth
              disabled
            >
              Feedback
            </Button>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Submit Answer
            </Button>
          </Stack>
        </Stack>
      )}
    </Panel>
  );
}
