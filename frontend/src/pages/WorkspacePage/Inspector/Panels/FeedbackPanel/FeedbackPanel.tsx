import { Button, Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { useState } from "react";
import MessageInput from "./Chat/MessageInput";
import MessageList from "./Chat/MessageList";

export default function FeedbackPanel() {
  const [messages, setMessages] = useState([
    { text: "Hello!", sender: "AI", isUser: false },
    { text: "Hi there!", sender: "User", isUser: true },
  ]);

  function handleMessageSend(message: string) {
    setMessages([
      ...messages,
      { text: message, sender: "User1", isUser: true },
    ]);
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
