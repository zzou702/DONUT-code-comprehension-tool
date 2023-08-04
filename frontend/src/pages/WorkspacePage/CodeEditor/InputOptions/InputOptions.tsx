import { Box, Button, Stack, Typography } from "@mui/material";
import Panel from "../../../../components/Panel";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import OptionMenu from "./OptionMenu";
import VerifyInputCode from "./VerifyInputCode";
import PromptInput from "./PromptInput";
import InputOptionState from "../../../../models/InputOptionState";

/**
 * Controller for Input Option States.
 */
export default function InputOptions() {
  const { inputOptionState, setEditorDisabled, setEditorReadOnly } =
    useContext(WorkspaceContext);

  useEffect(() => {
    // Lock editor once program generation method has been confirmed.
    switch (inputOptionState) {
      case InputOptionState.COMPLETE:
        // Method confirmed.
        setEditorDisabled(false);
        setEditorReadOnly(true);
        break;

      case InputOptionState.CUSTOM_CODE:
        setEditorDisabled(false);
        break;

      default:
        setEditorDisabled(true);
    }
  }, [inputOptionState]);

  return (
    <>
      {
        // Select component to render based on current enum value.
        {
          unselected: <OptionMenu />,
          custom_code: <VerifyInputCode />,
          prompt: <PromptInput />,
          complete: <></>,
        }[inputOptionState]
      }
    </>
  );
}
