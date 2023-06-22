import { Box, Stack, Typography } from "@mui/material";
import { spacing } from "../SharedStyles";
import EditorControls from "./EditorControls";

interface Props {
  children: string;
}

export default function FileHeader(props: Props) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        background: "#111",
      }}
    >
      <Typography
        sx={{
          ml: spacing * 2,
          color: "white",
          textAlign: "left",
          fontFamily: "monospace",
        }}
      >
        {props.children}
      </Typography>
      <EditorControls />
    </Stack>
  );
}
