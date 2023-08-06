import { Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import Panel from "../../../components/Panel";
import MainScreen from "./MainScreen";

export default function Inspector() {
  return (
    <Stack sx={{ height: "100%" }} spacing={spacing}>
      <Panel
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#eee",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <MainScreen />
      </Panel>
    </Stack>
  );
}
