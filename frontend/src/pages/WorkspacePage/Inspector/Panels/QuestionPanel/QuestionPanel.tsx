import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import QuestionCard from "./QuestionCard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { Button, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";

export default function QuestionPanel() {
  const { generateQuestions, saveQuestions, questionStates } =
    useContext(WorkspaceContext);

  async function handleGenerate() {
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
    </Stack>
  );
}
