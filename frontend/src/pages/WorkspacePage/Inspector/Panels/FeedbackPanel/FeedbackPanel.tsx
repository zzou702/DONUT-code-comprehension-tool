import { IconButton, Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { useContext } from "react";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function FeedbackPanel() {
  const { getCurrentQuestion, messages, setFeedbackOpen } =
    useContext(WorkspaceContext);

  function handleClose() {
    setFeedbackOpen(false);
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
      <Stack
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
          }}
        >
          {"<"}
        </IconButton>
        <Typography>Question {getCurrentQuestion().number} Feedback</Typography>
      </Stack>
      <MessageList messages={messages} />
      <MessageInput />
    </Stack>
  );
}
