import { Stack, Typography } from "@mui/material";
import Panel from "../../../../../../components/Panel";
import { spacing } from "../../../../SharedStyles";

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
  text: string;
  sender: string;
  isUser: boolean;
}

export default function Message({ text, isUser }: Props) {
  const messageStyle = isUser ? selfMessageStyle : receivedMessageStyle;
  const panelStyle = isUser ? selfPanelStyle : receivedPanelStyle;

  return (
    <Stack sx={{ ...messageStyle }}>
      <Panel
        sx={{
          mb: spacing * 0.5,
          px: spacing,
          py: spacing * 0.5,
          background: "#ddd",

          ...panelStyle,
        }}
      >
        <Typography>{text}</Typography>
      </Panel>
    </Stack>
  );
}
