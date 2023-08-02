import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import { spacing } from "../SharedStyles";

export default function TutorialScreen() {
  const { closeTutorial } = useContext(WorkspaceContext);

  function handleCloseTutorial() {
    closeTutorial();
  }

  return (
    <Stack
      spacing={spacing}
      sx={{
        p: spacing,
        height: "100%",
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
  );
}
