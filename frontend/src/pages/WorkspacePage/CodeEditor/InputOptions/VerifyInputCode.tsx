import { Button, Stack } from "@mui/material";
import { spacing } from "../../SharedStyles";

export default function VerifyInputCode() {
  return (
    <Stack
      sx={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Button variant="contained">Generate Questions</Button>
    </Stack>
  );
}
