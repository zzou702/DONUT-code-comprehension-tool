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
        height: "60px",
        alignItems: "center",
        background: "#111",
        // borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          ml: spacing * 2,

          color: "white",
          textAlign: "left",

          fontSize: "medium",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        {props.children}
      </Typography>
      <EditorControls />
    </Stack>
  );
}
