import { IconButton, Stack, SxProps, styled } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Panel from "../../../components/Panel";
import { spacing } from "../SharedStyles";
import MaterialUISwitch from "../../../components/MaterialUISwitch";

const iconStyles = {
  color: "white",
} as SxProps;

export default function EditorControls() {
  return (
    <Stack
      direction="row"
      sx={{
        ml: "auto",
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: spacing * 0.5,
        }}
        spacing={spacing}
      >
        <Panel>
          <IconButton size="small">
            <ZoomInIcon sx={iconStyles} />
          </IconButton>
          <IconButton size="small">
            <ZoomOutIcon sx={iconStyles} />
          </IconButton>
        </Panel>
        <MaterialUISwitch />
      </Stack>
    </Stack>
  );
}
