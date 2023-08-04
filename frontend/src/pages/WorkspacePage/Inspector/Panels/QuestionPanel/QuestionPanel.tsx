import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { CircularProgress, Stack } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import QuestionList from "./QuestionList";

export default function QuestionPanel() {
  const { programGenState, questionsLoading } = useContext(WorkspaceContext);

  return (
    <Stack
      spacing={spacing}
      sx={{
        height: "100%",
        boxSizing: "border-box",
        p: spacing,
      }}
    >
      {
        // Select component to render based on current enum value.
        {
          unselected: <></>,
          custom_code: <></>,
          prompt: <></>,
          complete: (
            <>
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
            </>
          ),
        }[programGenState]
      }
    </Stack>
  );
}
