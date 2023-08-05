import { Box, Button, Stack, Typography } from "@mui/material";
import Panel from "../../../../components/Panel";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import OptionMenu from "./OptionMenu";
import VerifyInputCode from "./VerifyInputCode";
import PromptInput from "./PromptInput";
import ProgramGenState from "../../../../models/ProgramGenState";

/**
 * Controller for Input Option States.
 */
export default function InputOptions() {
  const { programGenState, setEditorDisabled, setEditorReadOnly } =
    useContext(WorkspaceContext);

  useEffect(() => {
    // Lock editor once program generation method has been confirmed.
    switch (programGenState) {
      case ProgramGenState.COMPLETE:
        // Method confirmed.
        setEditorDisabled(false);
        setEditorReadOnly(true);
        break;

      case ProgramGenState.CUSTOM_CODE:
        setEditorDisabled(false);
        break;

      default:
        setEditorDisabled(true);
    }
  }, [programGenState]);

  return (
    <>
      {
        // Select component to render based on current enum value.
        {
          unselected: <OptionMenu />,
          custom_code: <VerifyInputCode />,
          prompt: <PromptInput />,
          complete: <></>,
        }[programGenState]
      }
    </>
  );
}
