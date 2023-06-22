import { Route, Routes } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/PageLayout/PageLayout";
import HomePage from "./pages/HomePage/HomePage";
import QuizSetupPage from "./pages/QuizSetupPage/QuizSetupPage";
import WorkspacePage from "./pages/WorkspacePage/WorkspacePage";
import WorkspaceContextLayout from "./components/WorkspaceContextLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<WorkspaceContextLayout />}>
          <Route path="setup" element={<QuizSetupPage />} />
          <Route path="workspace" element={<WorkspacePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
