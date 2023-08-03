import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import QuestionCard from "./QuestionCard";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { CircularProgress, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import QuestionList from "./QuestionList";

export default function QuestionPanel() {
  const { questionsLoading } = useContext(WorkspaceContext);

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
          <QuestionList />
          <AnswerBox />
        </>
      )}
    </Stack>
  );
}
