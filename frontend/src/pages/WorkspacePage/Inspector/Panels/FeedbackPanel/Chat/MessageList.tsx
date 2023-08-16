import { Stack } from "@mui/material";
import { spacing } from "../../../../SharedStyles";
import MessageItem from "./MessageItem";
import { useRef, useEffect } from "react";
import Message from "../../../../../../models/Message";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Stack
      sx={{
        // Do not use spacing={spacing}, as seems to break margins of messages
        height: 0,
        p: spacing,
        flexGrow: 1,
        overflowX: "hidden",
        overflowY: "scroll",
        border: "solid 1px #ccc", // FIXME: need a better way to handle hard coded colours
        borderRadius: 1,
      }}
      ref={messageListRef}
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </Stack>
  );
}
