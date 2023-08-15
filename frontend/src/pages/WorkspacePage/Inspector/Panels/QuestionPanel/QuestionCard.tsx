import { Box, Button, Stack, SxProps, Typography, styled } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";
import DoneIcon from "@mui/icons-material/Done";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import QuestionState, {
  CompletionStatus,
} from "../../../../../models/QuestionState";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import DifficultyTag from "./DifficultyTag";

interface Props {
  questionState: QuestionState;
}

export default function QuestionCard(props: Props) {
  const { currentQuestionNumber, getCurrentQuestion, setCurrentQuestion } =
    useContext(WorkspaceContext);

  const [panelStyle, setPanelStyle] = useState<SxProps>();

  function handleClick() {
    if (currentQuestionNumber == props.questionState.number) {
      return;
    }
    setCurrentQuestion(props.questionState.number);
  }

  useEffect(() => {
    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion || !props.questionState) {
      return;
    }
    if (props.questionState.number == currentQuestion.number) {
      currentQuestion.attempted();
      setPanelStyle({ background: "#eee" });
    } else {
      setPanelStyle({});
    }
  }, [currentQuestionNumber]);

  return (
    <div onClick={handleClick}>
      <Panel
        sx={{
          alignItems: "center",
          p: spacing * 0.5,

          "&:hover": {
            background: "#ddd",
          },
          ...panelStyle,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <DifficultyTag difficulty={props.questionState.question.difficulty} />
          <Typography sx={{ fontWeight: "bold", px: spacing }}>
            {`${props.questionState.number})`}
          </Typography>
          <Typography sx={{ textAlign: "left" }}>
            {props.questionState.question.description}
          </Typography>

          <Box sx={{ ml: "auto", color: "grey" }}>
            {props.questionState.completionStatus ==
              CompletionStatus.COMPLETED && <DoneIcon />}
            {props.questionState.completionStatus ==
              CompletionStatus.ATTEMPTED && <QuestionMarkIcon />}
          </Box>
        </Stack>
      </Panel>
    </div>
  );
}
