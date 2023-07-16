import { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import Panel from "../../../components/Panel";
import FileHeader from "./FileHeader";
import { Button, Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";

export default function CodeEditor() {
  const code = useRef(`function add(a, b) {\n  return a + b;\n}`);
  const { highlightedLines, setHighlightedLines } =
    useContext(WorkspaceContext);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();

  // const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  useEffect(() => {
    editor?.onDidChangeCursorSelection(() => {
      if (editor) {
        const selections = editor.getSelections();
        if (!selections) {
          // No active selection
          return;
        }

        console.log("Selections: ", selections);

        const lines = selections.map((selection) => {
          const startLine = selection.startLineNumber;
          const endLine = selection.endLineNumber;
          const lines = [];
          for (let line = startLine; line <= endLine; line++) {
            lines.push(editor.getModel()?.getLineContent(line));
          }

          return lines.join("\n");
        });

        setHighlightedLines(lines);
        console.log("Highlighted lines:", highlightedLines);
      }
    });
  }, [editor]);

  // function handleHighlightChange() {
  //   const editor = editorRef.current;

  //   if (editor) {
  //     const selections = editor.getSelections();
  //     if (!selections) {
  //       // No active selection
  //       return;
  //     }

  //     console.log("Selections: ", selections);

  //     const highlightedLines = selections.map((selection) => {
  //       const startLine = selection.startLineNumber;
  //       const endLine = selection.endLineNumber;
  //       const lines = [];
  //       for (let line = startLine; line <= endLine; line++) {
  //         lines.push(editor.getModel()?.getLineContent(line));
  //       }

  //       return lines.join("\n");
  //     });

  //     console.log("Highlighted lines:", highlightedLines);
  //   }
  // }

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
              bottom: 1,
            },
          }}
        />
        {/* <Button onClick={handleHighlightChange}>
          Extract Highlighted Lines
        </Button> */}
      </Panel>
    </Stack>
  );
}
