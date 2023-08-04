import { Stack, Typography, Button } from "@mui/material";
import ProgramGenState from "../../../../models/ProgramGenState";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import Panel from "../../../../components/Panel";
import { spacing } from "../../SharedStyles";

export default function OptionMenu() {
  const { setProgramGenState } = useContext(WorkspaceContext);

  return (
    <Panel
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        padding: spacing,

        background: "white",
      }}
    >
      <Stack spacing={spacing}>
        <Typography>Generate a program with:</Typography>
        <Button
          onClick={() => setProgramGenState(ProgramGenState.PROMPT)}
          variant="contained"
        >
          Prompt
        </Button>
        <Button
          onClick={() => setProgramGenState(ProgramGenState.CUSTOM_CODE)}
          variant="contained"
        >
          Custom Code
        </Button>
      </Stack>
    </Panel>
  );
}
