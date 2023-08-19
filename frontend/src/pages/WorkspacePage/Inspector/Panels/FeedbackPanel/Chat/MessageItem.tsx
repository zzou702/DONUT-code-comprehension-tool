import { Stack, Typography } from "@mui/material";
import Panel from "../../../../../../components/Panel";
import { spacing } from "../../../../SharedStyles";
import Message from "../../../../../../models/Message";
import ReactMarkdown from "react-markdown";

const receivedMessageStyle = {
  marginRight: "auto",
};
const selfMessageStyle = {
  marginLeft: "auto",
};

const receivedPanelStyle = {
  background: "#f6f6f6",
  borderTopLeftRadius: 0,
};

const selfPanelStyle = {
  background: "#655DC3",
  color: "white",
  borderBottomRightRadius: 0,
};

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  const messageStyle = message.isUser ? selfMessageStyle : receivedMessageStyle;
  const panelStyle = message.isUser ? selfPanelStyle : receivedPanelStyle;

  return (
    <Stack sx={{ maxWidth: "70%", ...messageStyle }}>
      <Panel
        sx={{
          textAlign: "justify",
          mb: spacing * 0.5,
          px: spacing,
          py: spacing * 0.5,
          overflow: "scroll",

          ...panelStyle,
        }}
      >
        <Typography
          component="div"
          variant="body1"
          sx={{
            "& p": { margin: 0 },
            fontFamily: "serif",
          }}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </Typography>
      </Panel>
    </Stack>
  );
}
