import { Outlet } from "react-router-dom";
import { WorkspaceContextProvider } from "../context/WorkspaceContextProvider";

export default function WorkspaceContextLayout() {
  return (
    <WorkspaceContextProvider>
      <Outlet />
    </WorkspaceContextProvider>
  );
}
