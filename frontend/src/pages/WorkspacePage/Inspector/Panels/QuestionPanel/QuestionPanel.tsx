import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import QuestionCard from "./QuestionCard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { Button, CircularProgress, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";

export default function QuestionPanel() {
  const {
    clearQuestions,
    generateQuestions,
    saveQuestions,
    questionStates,
    questionsLoading,
  } = useContext(WorkspaceContext);

  async function handleGenerate() {
    clearQuestions();
    await generateQuestions();
    saveQuestions();
  }

  return (
    <Stack
      spacing={spacing}
      sx={{
        height: "100%",
        boxSizing: "border-box",
        p: spacing,
      }}
    >
      {questionsLoading ? (
        <CircularProgress
          // Use style instead of sx, as sx is overridden
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      ) : (
        <>
          <Stack
            spacing={spacing}
            // height: 0, flexGrow: 1 to ensure question list fills up available vertical space
            sx={{ height: 0, flexGrow: 1, overflow: "scroll" }}
          >
            {questionStates &&
              questionStates.map((questionState, index) => (
                <QuestionCard
                  key={index}
                  number={index + 1}
                  questionState={questionState}
                />
              ))}
            <Button variant="outlined" onClick={handleGenerate}>
              Generate More
            </Button>
          </Stack>
          <AnswerBox />
        </>
      )}
    </Stack>
  );
}
