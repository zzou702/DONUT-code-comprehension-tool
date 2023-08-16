import { Stack, Button } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import QuestionCard from "./QuestionCard";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function QuestionList() {
  const { clearQuestions, generateQuestions, saveQuestions, questionStates } =
    useContext(WorkspaceContext);

  async function handleGenerate() {
    // clearQuestions();
    await generateQuestions();
    // saveQuestions();
  }
  return (
    <Stack
      spacing={spacing}
      // height: 0, flexGrow: 1 to ensure question list fills up available vertical space
      sx={{
        height: 0,
        p: spacing,
        flexGrow: 1,
        overflow: "scroll",
        border: "solid 1px #ccc", // FIXME: need a better way to handle hard coded colours
        borderRadius: 1,
      }}
    >
      {questionStates &&
        questionStates.map((questionState, index) => (
          <QuestionCard key={index} questionState={questionState} />
        ))}
      <Button variant="outlined" onClick={handleGenerate}>
        Generate More
      </Button>
    </Stack>
  );
}
