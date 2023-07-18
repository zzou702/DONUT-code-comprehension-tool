import { useContext, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import Panel from "../../../components/Panel";
import FileHeader from "./FileHeader";
import { Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";

export default function CodeEditor() {
  const { setEditor } = useContext(WorkspaceContext);

  const code = useRef(`function add(a, b) {\n  return a + b;\n}`);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  return (
    <Stack sx={{ height: "inherit" }} spacing={spacing * 0.5}>
      <Panel
        sx={{
          // z-index: 100 to prevent MUI elements overlapping editor dropdowns.
          zIndex: 100,
          height: "inherit",
          position: "sticky",
          overflow: "hidden",
        }}
      >
        {/* https://www.npmjs.com/package/@monaco-editor/react?activeTab=readme */}

        <FileHeader>Question Test Program (JavaScript)</FileHeader>
        <Editor
          height="inherit"
          language="javascript"
          value={code.current}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            // readOnly: true, // TODO: do we want to support changing the program to generate new questions?
            padding: {
              top: 20,
              bottom: 20,
            },
          }}
        />
      </Panel>
    </Stack>
  );
}
