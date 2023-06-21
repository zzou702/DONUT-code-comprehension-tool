import React, { ReactElement, useState } from "react";
import { Panel } from "../pages/WorkspacePage/Inspector/Inspector";

export interface WorkspaceContextType {
  currentPanel: Panel;
  selectPanel: (panel: Panel) => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

type Props = {
  children: ReactElement | ReactElement[];
};

function WorkspaceContextProvider({ children }: Props) {
  const [currentPanel, setcurrentPanel] = useState<Panel>(Panel.QUESTION);

  const selectPanel = (panel: Panel) => {
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
