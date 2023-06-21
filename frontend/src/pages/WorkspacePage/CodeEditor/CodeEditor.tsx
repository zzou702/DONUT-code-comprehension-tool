import { useRef } from "react";
import Panel from "../Inspector/Panels/Panel";
import { Editor } from "@monaco-editor/react";
import type monaco from "monaco-editor";

export default function CodeEditor() {
  const code = useRef(`function add(a, b) {\n  return a + b;\n}`);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  return (
    <Panel sx={{ height: "inherit", position: "sticky", overflow: "hidden" }}>
      {/* https://www.npmjs.com/package/@monaco-editor/react?activeTab=readme */}
      <Editor
        height="inherit"
        language="javascript"
        value={code.current}
        onMount={handleEditorDidMount}
        options={{
          theme: "vs-light",
          automaticLayout: true,
        }}
      />
    </Panel>
  );
}
