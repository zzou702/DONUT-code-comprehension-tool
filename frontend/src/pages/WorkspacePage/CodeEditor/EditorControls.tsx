import { Button, Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";

export default function EditorControls() {
  const { resetWorkspace } = useContext(WorkspaceContext);

  function handleResetWorkspace() {
    const confirmReset = confirm(
      "Are you sure you want to reset your workspace?\n\n" +
        "This will clear the questions, answers and feedback.\n" +
        "You will also need to generate the program again."
    );

    if (confirmReset) {
      resetWorkspace();
    }
  }

  return (
    <Stack
      direction="row"
      sx={{
        ml: "auto",
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: spacing * 0.5,
          alignItems: "center",
        }}
        spacing={spacing}
      >
        <Button
          variant="outlined"
          sx={{ fontSize: "12px" }}
          onClick={handleResetWorkspace}
        >
          Reset Workspace
        </Button>
      </Stack>
    </Stack>
  );
}
