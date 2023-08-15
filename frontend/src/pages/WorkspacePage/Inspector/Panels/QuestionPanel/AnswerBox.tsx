import { Button, Stack, TextField, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import Difficulty from "../../../../../models/Difficulty";
import { CompletionStatus } from "../../../../../models/QuestionState";

export default function AnswerBox() {
  const { getCurrentQuestion, submitAnswer, resetCurrentQuestion } =
    useContext(WorkspaceContext);

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
    const currentQuestion = getCurrentQuestion();
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
  }, [getCurrentQuestion()]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
    sessionStorage.setItem(
      getCurrentQuestion().question.description + "answer",
      event.target.value
    );
  }

  function handleSubmit() {
    const confirmSubmit = confirm(
      "Submit answer for this question?\n\n" + "Your answer:\n\n" + value
    );

    if (!confirmSubmit) {
      return;
    }

    submitAnswer(
      getCurrentQuestion().question.description,
      value,
      getCurrentQuestion().question.difficulty.name
    );
  }

  function handleFeedback() {
    return;
  }

  function handleReset() {
    resetCurrentQuestion();
  }

  return (
    <Panel
      sx={{
        background: "white",
      }}
    >
      {getCurrentQuestion() && (
        <Stack spacing={spacing}>
          <Stack direction="row">
            <Typography
              sx={{ fontWeight: "bold", px: spacing, textAlign: "right" }}
            >
              Question {getCurrentQuestion().number}:
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {getCurrentQuestion().question.description}
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
              onClick={handleReset}
              fullWidth
              disabled={
                getCurrentQuestion().completionStatus !=
                CompletionStatus.COMPLETED
              }
            >
              Reset Answer
            </Button>
            {getCurrentQuestion().completionStatus ==
            CompletionStatus.COMPLETED ? (
              <Button variant="contained" onClick={handleFeedback} fullWidth>
                See Feedback
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} fullWidth>
                Submit Answer
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </Panel>
  );
}
