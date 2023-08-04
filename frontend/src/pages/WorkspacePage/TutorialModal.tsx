import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";
import { spacing } from "./SharedStyles";
import Panel from "../../components/Panel";

export default function TutorialModal() {
  const { closeTutorial } = useContext(WorkspaceContext);

  function handleCloseTutorial() {
    closeTutorial();
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

          <Button variant="contained" onClick={handleCloseTutorial}>
            Start
          </Button>
        </Stack>
      </Panel>
    </div>
  );
}
