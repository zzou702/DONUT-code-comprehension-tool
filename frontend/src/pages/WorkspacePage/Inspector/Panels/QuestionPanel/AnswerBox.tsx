import { Button, Stack, TextField, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import QuestionState, {
  CompletionStatus,
} from "../../../../../models/QuestionState";

export default function AnswerBox() {
  const {
    questionUpdatedFlag,
    getCurrentQuestion,
    submitAnswer,
    resetCurrentQuestion,
  } = useContext(WorkspaceContext);

  const [currentQuestion, _setCurrentQuestion] = useState<QuestionState>();

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
    _setCurrentQuestion(getCurrentQuestion());

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
  }, [questionUpdatedFlag]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!currentQuestion) {
      return;
    }
    setValue(event.target.value);
    sessionStorage.setItem(
      currentQuestion.question.description + "answer",
      event.target.value
    );
  }

  function handleSubmit() {
    if (!currentQuestion) {
      return;
    }

    const confirmSubmit = confirm(
      "Submit answer for this question?\n\n" + "Your answer:\n\n" + value
    );

    if (!confirmSubmit) {
      return;
    }

    submitAnswer(
      currentQuestion.question.description,
      value,
      currentQuestion.question.difficulty.name
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
              onClick={handleReset}
              fullWidth
              disabled={
                currentQuestion.completionStatus != CompletionStatus.COMPLETED
              }
            >
              Reset Answer
            </Button>
            {currentQuestion.completionStatus == CompletionStatus.COMPLETED ? (
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
