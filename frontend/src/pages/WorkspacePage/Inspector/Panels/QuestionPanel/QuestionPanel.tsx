import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import QuestionCard from "./QuestionCard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { Button, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import Panel from "../../../../../components/Panel";

export default function QuestionPanel() {
  const { questions } = useContext(WorkspaceContext);

  return (
    <Panel
      sx={{
        height: "100%",
        boxSizing: "border-box",
        border: "none",
        p: spacing,
      }}
    >
      <Stack
        spacing={spacing}
        sx={{
          height: "inherit",
        }}
      >
        <Stack
          spacing={spacing}
          // height: 0, flexGrow: 1 to ensure question list fills up available vertical space
          sx={{ height: 0, flexGrow: 1, overflow: "scroll" }}
        >
          {questions &&
            questions.map((question, index) => (
              <QuestionCard
                key={index}
                number={index + 1}
                question={question}
              />
            ))}
          <Button variant="outlined">Generate More</Button>
        </Stack>
        <AnswerBox />
      </Stack>
    </Panel>
  );
}
