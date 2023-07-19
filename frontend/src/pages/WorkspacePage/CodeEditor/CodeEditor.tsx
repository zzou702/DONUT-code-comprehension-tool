import { useContext, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import Panel from "../../../components/Panel";
import FileHeader from "./FileHeader";
import { Button, Stack } from "@mui/material";
import { spacing } from "../SharedStyles";
import { WorkspaceContext } from "../../../context/WorkspaceContextProvider";

export default function CodeEditor() {
  const { editor, setEditor, program, language } = useContext(WorkspaceContext);

  const { highlightedLines, setHighlightedLines } =
    useContext(WorkspaceContext);

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
          language={language}
          value={program}
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
