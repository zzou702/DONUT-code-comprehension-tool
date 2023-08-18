import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";
import { spacing } from "./SharedStyles";
import Panel from "../../components/Panel";

export default function TutorialModal() {
  const {
    setTutorialOpen,
    setStudentId,
    hasInputStudentId,
    setInputStudentId,
  } = useContext(WorkspaceContext);

  const [tempStudentId, setTempStudentId] = useState<string>("");

  function handleCloseTutorial() {
    if (!hasInputStudentId) {
      setStudentId(tempStudentId);
      setInputStudentId(true);
    }
    setTutorialOpen(false);
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && hasUserInput()) {
      handleCloseTutorial(); // Trigger the button action when Enter is pressed
    }
  };

  function hasUserInput() {
    return tempStudentId != "" || hasInputStudentId;
  }

  return (
    <div
      style={{
        zIndex: 100,
        position: "absolute",
        top: 0,
        width: "100vw",
        height: "100vh",

        background: "rgba(0,0,0,0.8)",
        overflow: "hidden",
      }}
    >
      <Panel
        sx={{
          position: "absolute",
          maxHeight: "80%",
          width: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          padding: spacing,

          background: "white",
          overflow: "auto",
        }}
      >
        <Stack
          spacing={spacing}
          sx={{
            p: spacing,
          }}
        >
          <Stack
            spacing={spacing}
            sx={{
              p: spacing,
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Welcome to DONUT Code Comprehension!
            </Typography>
            <div
              style={{
                textAlign: "left",
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: "serif" }}>
                <span>
                  Hello and welcome to the Code Comprehension Tool! We're
                  excited to have you here. This tool is designed to help you
                  improve your code understanding abilities. Here's a quick look
                  at the basic features:
                  <br />
                  <br />
                  <b>Generate Questions:</b> You can input a prompt or your own
                  code and generate questions to test your understanding.
                  <br />
                  <b>Code Editor:</b> Use the code editor on the left to input
                  your code and experiment.
                  <br />
                  <b>Question List:</b> Questions will appear on the right with
                  difficulty labels, providing a comprehensive practice
                  experience.
                  <br />
                  <b>Answer Box:</b> Answer the questions, and they'll be
                  evaluated automatically using AI.
                  <br />
                  <b>Feedback and chat:</b> Receive feedback on your answers and
                  engage in follow-up discussions.
                  <br />
                  <b>Line-by-Line Explanation:</b> Highlight any line in the
                  code to get an in-depth explanation.
                  <br />
                  <br />
                  Feel free to explore and make the most out of this tool. You
                  can get started by entering your <b>student ID</b>, and
                  there's a more detailed tutorial available once you're ready
                  to dive in!
                  <br />
                  <br />
                  Help us enhance your learning experience! Share your thoughts
                  through our feedback form to make the Code Comprehension Tool
                  better. Your input matters!&nbsp;&nbsp;
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://forms.gle/2trxnp6urSNq22xAA"
                  >
                    Fill in our survey please ヽ(ˋДˊ)ノ
                  </Link>
                  <br />
                  <br />
                  Encountered an issue? Let us know! Fill out our error report
                  form to help us improve the tool and provide you with a
                  seamless learning journey.&nbsp;&nbsp;
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://forms.gle/T8r7rExvYmrYBdcSA"
                  >
                    Error Report
                  </Link>
                </span>
              </Typography>
            </div>
          </Stack>

          {!hasInputStudentId && (
            <Stack>
              <Typography variant="body1" fontWeight="bold" align="left">
                Student ID:
              </Typography>
              <TextField
                value={tempStudentId}
                onChange={(e) => setTempStudentId(e.target.value)}
                placeholder="e.g: 123456789"
                onKeyDown={handleKeyDown}
              />
            </Stack>
          )}
          <Button
            variant="contained"
            onClick={handleCloseTutorial}
            disabled={!hasUserInput()} // Disable start unless ID has been entered (before)
          >
            {!hasInputStudentId ? "Start" : "OK"}
          </Button>
        </Stack>
      </Panel>
    </div>
  );
}
