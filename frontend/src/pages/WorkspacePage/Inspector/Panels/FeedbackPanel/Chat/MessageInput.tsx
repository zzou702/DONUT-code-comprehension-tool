import { TextField, Stack, Button } from "@mui/material";
import { useState } from "react";
import { spacing } from "../../../../SharedStyles";

interface Props {
  onMessageSend: (message: string) => void;
}

export default function MessageInput({ onMessageSend }: Props) {
  const [message, setMessage] = useState("");

  function handleMessageSend() {
    if (message.trim()) {
      onMessageSend(message);
      setMessage("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior (form submission)
      handleMessageSend();
    }
  }

  return (
    <>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        multiline
        placeholder="Ask about your feedback here."
      />
      <Stack direction="row" spacing={spacing}>
        <Button variant="contained" onClick={handleMessageSend} fullWidth>
          Send
        </Button>
      </Stack>
    </>
  );
}
