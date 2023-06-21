import { AppBar, Box, Stack, Tab, Tabs, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import PromptEntry from "./PromptEntry";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import QuestionPanel from "./Panels/QuestionPanel/QuestionPanel";
import ExplanationsPanel from "./Panels/ExplanationsPanel";
import FeedbackPanel from "./Panels/FeedbackPanel";
import TabPanel from "../../../components/Tabs/TabPanel";

export default function Inspector() {
  // const theme = useTheme();
  // const { currentPanel } = useContext(WorkspaceContext);

  const [currentPanel, setcurrentPanel] = useState<Panel>(Panel.QUESTION);

  function handleChange(event: React.SyntheticEvent, index: Panel) {
    setcurrentPanel(index);
  }

  return (
    <Stack sx={{ height: "100%" }}>
      <PromptEntry />

      <AppBar position="static">
        <Tabs
          value={currentPanel}
          onChange={handleChange}
          // indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Questions" value={Panel.QUESTION} />
          <Tab label="Explanations" value={Panel.EXPLANATIONS} />
          <Tab label="Feedback" value={Panel.FEEDBACK} />
        </Tabs>
      </AppBar>

      <TabPanel value={currentPanel} index={Panel.QUESTION}>
        <QuestionPanel />
      </TabPanel>
      <TabPanel value={currentPanel} index={Panel.EXPLANATIONS}>
        <ExplanationsPanel />
      </TabPanel>
      <TabPanel value={currentPanel} index={Panel.FEEDBACK}>
        <FeedbackPanel />
      </TabPanel>
    </Stack>
  );
}

export enum Panel {
  QUESTION,
  EXPLANATIONS,
  FEEDBACK,
}
