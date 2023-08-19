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
    setFeedbackOpen,
    resetCurrentQuestion,
    loadMessages,
    isSubmitting,
  } = useContext(WorkspaceContext);

  const [currentQuestion, _setCurrentQuestion] = useState<QuestionState>();

  const [value, setValue] = useState("");

  /**
   * Use this to force rerender.
   */
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    // Need to assign here as used immediately. Otherwise, need to wait for nexr rerender.
    const _currentQuestion = getCurrentQuestion();

    if (
      _currentQuestion &&
      _currentQuestion.question &&
      _currentQuestion.question.description
    ) {
      setValue(
        sessionStorage.getItem(
          _currentQuestion.question.description + "answer"
        ) || ""
      );
    }
    _setCurrentQuestion(_currentQuestion);
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

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && hasInput()) {
      handleSubmit(); // Trigger the button action when Enter is pressed
    }
  };

  async function handleSubmit() {
    if (!currentQuestion) {
      return;
    }

    const confirmSubmit = confirm(
      "Submit answer for this question?\n\n" + "Your answer:\n\n" + value
    );

    if (!confirmSubmit) {
      return;
    }

    currentQuestion.completed();

    // FIXME: force rerender to show completed status
    setTrigger((prev) => !prev);

    await submitAnswer(
      currentQuestion.question.description,
      value,
      currentQuestion.question.difficulty.name
    );
  }

  async function handleFeedback() {
    setFeedbackOpen(true);
    await loadMessages();
  }

  function handleReset() {
    resetCurrentQuestion();
  }

  function hasInput() {
    return value.trim() != "";
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
            disabled={
              currentQuestion.completionStatus == CompletionStatus.COMPLETED
            }
            placeholder="Type your answer here."
            onKeyDown={handleKeyDown}
          />
          <Stack direction="row" spacing={spacing}>
            <Button
              variant="outlined"
              onClick={handleReset}
              fullWidth
              disabled={
                currentQuestion.completionStatus !=
                  CompletionStatus.COMPLETED || isSubmitting
              }
            >
              Edit Answer
            </Button>
            {currentQuestion.completionStatus == CompletionStatus.COMPLETED &&
            !isSubmitting ? (
              <Button variant="contained" onClick={handleFeedback} fullWidth>
                See Feedback
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting || !hasInput()}
                fullWidth
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </Panel>
  );
}
