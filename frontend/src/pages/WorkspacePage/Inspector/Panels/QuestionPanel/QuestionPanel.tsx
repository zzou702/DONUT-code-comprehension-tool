import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import QuestionCard from "./QuestionCard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { Button, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function QuestionPanel() {
  const { questionStates } = useContext(WorkspaceContext);

  async function handleGenerate() {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/questions`, {
        program: `{questionStates &&
          questionStates.map((questionState, index) => (
            <QuestionCard
              key={index}
              number={index + 1}
              questionState={questionState}
            />
          ))}`,
      });
      console.log(response);
      console.log(response.data.result.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
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
