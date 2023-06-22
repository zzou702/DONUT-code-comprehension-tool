import { Box, SxProps } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  children?: ReactElement | ReactElement[];
  sx?: SxProps;
}

export default function Panel(props: Props) {
  return (
    <Box
      sx={{
        border: "1px solid grey",
        borderRadius: "10px",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
