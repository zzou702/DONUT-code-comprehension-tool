import { Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import Panel from "../../../components/Panel";
import MainScreen from "./MainScreen";
import { useContext, useState } from "react";
import TutorialScreen from "./TutorialScreen";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";

export default function Inspector() {
  const { hasClosedTutorial } = useContext(WorkspaceContext);

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
        {hasClosedTutorial ? <MainScreen /> : <TutorialScreen />}
      </Panel>
    </Stack>
  );
}
