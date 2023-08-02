import { Stack, Typography, Button } from "@mui/material";
import InputOptionState from "../../../../models/InputOptionState";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import Panel from "../../../../components/Panel";
import { spacing } from "../../SharedStyles";

export default function OptionMenu() {
  const { inputOptionState, setInputOptionState } =
    useContext(WorkspaceContext);

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
          onClick={() => setInputOptionState(InputOptionState.PROMPT)}
          variant="contained"
        >
          Prompt
        </Button>
        <Button
          onClick={() => setInputOptionState(InputOptionState.CUSTOM_CODE)}
          variant="contained"
        >
          Custom Code
        </Button>
      </Stack>
    </Panel>
  );
}
