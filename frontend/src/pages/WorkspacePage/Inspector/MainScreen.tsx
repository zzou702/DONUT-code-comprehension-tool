import { AppBar, Tabs, Tab } from "@mui/material";
import TabPanel from "../../../components/Tabs/TabPanel";
import { theme } from "../WorkspaceTheme";
import ExplanationsPanel from "./Panels/ExplanationsPanel";
import { PanelPages } from "./Panels/PanelPages";
import QuestionPanel from "./Panels/QuestionPanel/QuestionPanel";
import { useContext, useState } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";
import ProgramGenState from "../../../models/ProgramGenState";
import FeedbackPanel from "./Panels/FeedbackPanel/FeedbackPanel";

export default function MainScreen() {
  const { programGenState, isFeedbackOpen } = useContext(WorkspaceContext);

  const [currentPanel, setCurrentPanel] = useState<PanelPages>(
    PanelPages.QUESTION
  );

  function handleChange(event: React.SyntheticEvent, index: PanelPages) {
    // TODO: save answer to local storage before navigating away
    setCurrentPanel(index);
  }

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={currentPanel}
          onChange={handleChange}
          // indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label="Questions"
            value={PanelPages.QUESTION}
            style={{ textTransform: "none", fontSize: "15px" }}
          />
          <Tab
            label="Explanations"
            value={PanelPages.EXPLANATIONS}
            disabled={programGenState != ProgramGenState.COMPLETE} // Other tabs disabled unless program generation method chosen.
            style={{ textTransform: "none", fontSize: "15px" }}
          />
          {/* <Tab label="Chat" value={PanelPages.CHAT} /> */}
        </Tabs>
      </AppBar>

      <div
        style={{
          flexGrow: 1,
          height: "100%",
          backgroundColor: theme.palette.background.paper,
          overflow: "auto",
        }}
      >
        <TabPanel
          value={currentPanel}
          index={PanelPages.QUESTION}
          style={{ height: "inherit" }}
        >
          {isFeedbackOpen ? <FeedbackPanel /> : <QuestionPanel />}
        </TabPanel>
        <TabPanel
          value={currentPanel}
          index={PanelPages.EXPLANATIONS}
          style={{ height: "inherit" }}
        >
          <ExplanationsPanel />
        </TabPanel>
        {/* <TabPanel
          value={currentPanel}
          index={PanelPages.CHAT}
          style={{ height: "inherit" }}
        >
          <FeedbackPanel />
        </TabPanel> */}
      </div>
    </>
  );
}
