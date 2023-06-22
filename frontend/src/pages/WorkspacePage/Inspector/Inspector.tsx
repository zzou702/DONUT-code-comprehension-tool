import { AppBar, Container, Stack, Tab, Tabs } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PromptEntry from "./PromptEntry";
import QuestionPanel from "./Panels/QuestionPanel/QuestionPanel";
import ExplanationsPanel from "./Panels/ExplanationsPanel";
import FeedbackPanel from "./Panels/FeedbackPanel";
import TabPanel from "../../../components/Tabs/TabPanel";
import { spacing } from "../SharedStyles";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import Panel from "../../../components/Panel";
import { PanelPages } from "./Panels/PanelPages";

export default function Inspector() {
  const { questions, generateQuestions } = useContext(WorkspaceContext);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const [currentPanel, setCurrentPanel] = useState<PanelPages>(
    PanelPages.QUESTION
  );

  function handleChange(event: React.SyntheticEvent, index: PanelPages) {
    // TODO: save answer to local storage before navigating away
    setCurrentPanel(index);
  }

  return (
    <Stack sx={{ height: "100%" }} spacing={spacing}>
      <PromptEntry />

      <Panel
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#eee",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <AppBar position="static">
          <Tabs
            value={currentPanel}
            onChange={handleChange}
            // indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Questions" value={PanelPages.QUESTION} />
            <Tab label="Explanations" value={PanelPages.EXPLANATIONS} />
            <Tab label="Feedback" value={PanelPages.FEEDBACK} />
          </Tabs>
        </AppBar>

        <div style={{ flexGrow: 1, height: "100%" }}>
          <TabPanel
            value={currentPanel}
            index={PanelPages.QUESTION}
            style={{ height: "inherit" }}
          >
            <QuestionPanel />
          </TabPanel>
          <TabPanel
            value={currentPanel}
            index={PanelPages.EXPLANATIONS}
            style={{ height: "inherit" }}
          >
            <ExplanationsPanel />
          </TabPanel>
          <TabPanel
            value={currentPanel}
            index={PanelPages.FEEDBACK}
            style={{ height: "inherit" }}
          >
            <FeedbackPanel />
          </TabPanel>
        </div>
      </Panel>
    </Stack>
  );
}
