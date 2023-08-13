import { Stack, Typography } from "@mui/material";
import Panel from "../../../../../../components/Panel";
import { spacing } from "../../../../SharedStyles";
import Message from "../../../../../../models/Message";

const receivedMessageStyle = {
  marginRight: "auto",
};
const selfMessageStyle = {
  marginLeft: "auto",
};

const receivedPanelStyle = {
  borderTopLeftRadius: 0,
};

const selfPanelStyle = {
  borderBottomRightRadius: 0,
};

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  const messageStyle = message.isUser ? selfMessageStyle : receivedMessageStyle;
  const panelStyle = message.isUser ? selfPanelStyle : receivedPanelStyle;

  return (
    <Stack sx={{ maxWidth: "100%", ...messageStyle }}>
      <Panel
        sx={{
          mb: spacing * 0.5,
          px: spacing,
          py: spacing * 0.5,
          background: "#ddd",
          overflow: "scroll",

          ...panelStyle,
        }}
      >
        <Typography>{message.content}</Typography>
      </Panel>
    </Stack>
  );
}
