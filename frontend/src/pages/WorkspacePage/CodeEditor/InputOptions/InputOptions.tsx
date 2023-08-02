import { Box, Button, Stack, Typography } from "@mui/material";
import Panel from "../../../../components/Panel";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import OptionMenu from "./OptionMenu";
import VerifyInputCode from "./VerifyInputCode";
import PromptInput from "./PromptInput";
import InputOptionState from "../../../../models/InputOptionState";
export default function InputOptions() {
  const { inputOptionState, setInputOptionState, setEditorDisabled } =
    useContext(WorkspaceContext);

  useEffect(() => {
    // Lock editor unless entering custom code
    if (inputOptionState != InputOptionState.CUSTOM_CODE) {
      setEditorDisabled(true);
    } else {
      setEditorDisabled(false);
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
          generated: <></>,
        }[inputOptionState]
      }
    </>
  );
}
