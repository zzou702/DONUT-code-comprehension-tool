import React, { ReactElement, useState } from "react";
import { PanelPage } from "../pages/WorkspacePage/Inspector/Inspector";

export interface WorkspaceContextType {
  currentPanel: PanelPage;
  selectPanel: (panel: PanelPage) => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

type Props = {
  children: ReactElement | ReactElement[];
};

function WorkspaceContextProvider({ children }: Props) {
  const [currentPanel, setcurrentPanel] = useState<PanelPage>(
    PanelPage.QUESTION
  );

  const selectPanel = (panel: PanelPage) => {
    setcurrentPanel(panel);
  };

  const context = { currentPanel, selectPanel } as WorkspaceContextType;

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export { WorkspaceContext, WorkspaceContextProvider };
