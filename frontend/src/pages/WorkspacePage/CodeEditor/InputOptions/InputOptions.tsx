import { Box, Button, Stack, Typography } from "@mui/material";
import Panel from "../../../../components/Panel";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";
import OptionMenu from "./OptionMenu";
import VerifyInputCode from "./VerifyInputCode";
import PromptInput from "./PromptInput";
export default function InputOptions() {
  const { inputOptionState, setInputOptionState } =
    useContext(WorkspaceContext);

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
