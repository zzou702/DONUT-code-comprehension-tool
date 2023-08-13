import { Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";
import { spacing } from "./SharedStyles";
import Panel from "../../components/Panel";

export default function TutorialModal() {
  const {
    setTutorialOpen,
    setStudentId,
    hasInputStudentId,
    setInputStudentId,
  } = useContext(WorkspaceContext);

  const [tempStudentId, setTempStudentId] = useState<string>("");

  function handleCloseTutorial() {
    if (!hasInputStudentId) {
      setStudentId(tempStudentId);
      setInputStudentId(true);
    }
    setTutorialOpen(false);
  }

  return (
    <div
      style={{
        zIndex: 100,
        position: "absolute",
        top: 0,
        width: "100vw",
        height: "100vh",

        background: "rgba(0,0,0,0.8)",
      }}
    >
      <Panel
        sx={{
          position: "absolute",
          width: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          padding: spacing,

          background: "white",
        }}
      >
        <Stack
          spacing={spacing}
          sx={{
            p: spacing,
          }}
        >
          <Stack
            spacing={spacing}
            sx={{
              p: spacing,
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">Welcome to the DONUT tool!</Typography>
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

          {!hasInputStudentId && (
            <Stack>
              <Typography variant="body1">Enter your student ID:</Typography>
              <TextField
                value={tempStudentId}
                onChange={(e) => setTempStudentId(e.target.value)}
                placeholder="e.g: 123456789"
              />
            </Stack>
          )}
          <Button
            variant="contained"
            onClick={handleCloseTutorial}
            disabled={tempStudentId == "" && !hasInputStudentId} // Disable start unless ID has been entered (before)
          >
            Start
          </Button>
        </Stack>
      </Panel>
    </div>
  );
}
