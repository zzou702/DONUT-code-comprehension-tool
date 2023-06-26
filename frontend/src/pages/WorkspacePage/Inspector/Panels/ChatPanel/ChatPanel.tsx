import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { spacing } from "../../../SharedStyles";
import InputBox from "./InputBox";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import Panel from "../../../../../components/Panel";

export default function ChatPanel() {
  const { chatPrompt, chatResponse, sendChatPrompt, responseLoading } =
    useContext(WorkspaceContext);

  function handleGenerateAgain() {
    sendChatPrompt(chatPrompt);
  }

  return (
    <Stack
      spacing={spacing}
      sx={{
        height: "100%",
        boxSizing: "border-box",
        p: spacing,
      }}
    >
      <Panel
        sx={{
          backgroundColor: "#ddd",
          px: spacing,
          py: spacing * 0.5,
          textAlign: "left",
        }}
      >
        {chatPrompt}
      </Panel>
      <Stack
        spacing={spacing}
        // height: 0, flexGrow: 1 to ensure question list fills up available vertical space
        sx={{ height: 0, flexGrow: 1, overflow: "scroll" }}
      >
        {/* Show loading symbol if response not received yet. */}
        {responseLoading ? (
          <CircularProgress
            // Use style instead of sx, as sx is overridden
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        ) : (
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {chatResponse}
          </Typography>
        )}
      </Stack>
      {/* Only show generate again button if there is a response. */}
      {chatResponse && (
        <Button
          variant="outlined"
          endIcon={<CachedIcon />}
          onClick={handleGenerateAgain}
        >
          Generate Again
        </Button>
      )}
      <InputBox />
    </Stack>
  );
}
