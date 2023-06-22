import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import Panel from "../../../components/Panel";
import FileHeader from "./FileHeader";

export default function CodeEditor() {
  const code = useRef(`function add(a, b) {\n  return a + b;\n}`);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  return (
    <Panel
      sx={{
        // z-index: 100 to prevent MUI elements overlapping editor dropdowns.
        zIndex: 100,
        height: "inherit",
        position: "sticky",
        overflow: "hidden",
      }}
    >
      <FileHeader>Question Test Program (JavaScript)</FileHeader>
      {/* https://www.npmjs.com/package/@monaco-editor/react?activeTab=readme */}
      <Editor
        height="inherit"
        language="javascript"
        value={code.current}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly: true, // TODO: do we want to support changing the program to generate new questions?
        }}
      />
    </Panel>
  );
}
