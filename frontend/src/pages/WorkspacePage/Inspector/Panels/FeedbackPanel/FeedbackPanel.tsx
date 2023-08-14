import { IconButton, Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { useContext } from "react";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function FeedbackPanel() {
  const { currentQuestion, messages } = useContext(WorkspaceContext);

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
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
          }}
        >
          {"<"}
        </IconButton>
        <Typography>Question {currentQuestion.number} Feedback</Typography>
      </Stack>
      <MessageList messages={messages} />
      <MessageInput />
    </Stack>
  );
}
