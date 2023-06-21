import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  children?: ReactElement | ReactElement[];
  index: number;
  value: number;
}

export default function TabPanel(props: Props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>{value === index && <>{children}</>}</div>
  );
}
