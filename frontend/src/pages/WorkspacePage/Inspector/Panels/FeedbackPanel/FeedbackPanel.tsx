import { Button, Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { useContext } from "react";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";
import Message from "../../../../../models/Message";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function FeedbackPanel() {
  const { messages, addMessage } = useContext(WorkspaceContext);

  function handleMessageSend(message: string) {
    addMessage(new Message("User", message, true));
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
      <MessageList messages={messages} />
      <MessageInput onMessageSend={handleMessageSend} />
    </Stack>
  );
}
