import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { CircularProgress, Stack, Typography } from "@mui/material";
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
          // TODO: there is probably a better way to show this when not complete.
          unselected: <ProgramGenInfo />,
          custom_code: <ProgramGenInfo />,
          prompt: <ProgramGenInfo />,
          complete: (
            <>
              {questionsLoading ? (
                <CircularProgress sx={{ m: "auto" }} />
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
function ProgramGenInfo() {
  return (
    <Stack
      spacing={spacing}
      sx={{
        p: spacing,
        flexGrow: 1,
      }}
    >
      <Typography variant="h6">Generating Questions</Typography>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Typography variant="body1">
          The tool uses AI to generate questions based on a program.
        </Typography>
        <ol>
          <li>first</li>
          <li>second</li>
        </ol>
      </div>
    </Stack>
  );
}
