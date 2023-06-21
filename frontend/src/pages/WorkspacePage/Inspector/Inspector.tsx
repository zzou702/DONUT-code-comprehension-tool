import { AppBar, Box, Stack, Tab, Tabs, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import PromptEntry from "./PromptEntry";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import QuestionPanel from "./Panels/QuestionPanel/QuestionPanel";
import ExplanationsPanel from "./Panels/ExplanationsPanel";
import FeedbackPanel from "./Panels/FeedbackPanel";
import TabPanel from "../../../components/Tabs/TabPanel";
import { spacing } from "../SharedStyles";

export default function Inspector() {
  // const theme = useTheme();
  // const { currentPanel } = useContext(WorkspaceContext);

  const [currentPanel, setcurrentPanel] = useState<PanelPage>(
    PanelPage.QUESTION
  );

  function handleChange(event: React.SyntheticEvent, index: PanelPage) {
    setcurrentPanel(index);
  }

  return (
    <Stack sx={{ height: "100%" }} spacing={spacing}>
      <PromptEntry />

      <>
        <AppBar position="static">
          <Tabs
            value={currentPanel}
            onChange={handleChange}
            // indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Questions" value={PanelPage.QUESTION} />
            <Tab label="Explanations" value={PanelPage.EXPLANATIONS} />
            <Tab label="Feedback" value={PanelPage.FEEDBACK} />
          </Tabs>
        </AppBar>

        <TabPanel value={currentPanel} index={PanelPage.QUESTION}>
          <QuestionPanel />
        </TabPanel>
        <TabPanel value={currentPanel} index={PanelPage.EXPLANATIONS}>
          <ExplanationsPanel />
        </TabPanel>
        <TabPanel value={currentPanel} index={PanelPage.FEEDBACK}>
          <FeedbackPanel />
        </TabPanel>
      </>
    </Stack>
  );
}

export enum PanelPage {
  QUESTION,
  EXPLANATIONS,
  FEEDBACK,
}
