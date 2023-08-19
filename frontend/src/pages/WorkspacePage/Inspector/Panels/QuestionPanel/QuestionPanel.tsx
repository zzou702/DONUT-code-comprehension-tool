import { useContext } from "react";
import AnswerBox from "./AnswerBox";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import { CircularProgress, Link, Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import QuestionList from "./QuestionList";

export default function QuestionPanel() {
  const { programGenState, questionsLoading } = useContext(WorkspaceContext);

  return (
    <Stack
      spacing={spacing}
      sx={{
        height: "100%",
        boxSizing: "border-box",
        p: spacing,
      }}
    >
      {
        // Select component to render based on current enum value.
        {
          // TODO: there is probably a better way to show this when not complete.
          unselected: <ProgramGenInfo />,
          custom_code: <ProgramGenInfo />,
          prompt: <ProgramGenInfo />,
          complete: (
            <>
              {questionsLoading ? (
                <CircularProgress sx={{ m: "auto" }} />
              ) : (
                <>
                  <QuestionList />
                  <AnswerBox />
                </>
              )}
            </>
          ),
        }[programGenState]
      }
    </Stack>
  );
}
function ProgramGenInfo() {
  return (
    <Stack
      spacing={spacing}
      sx={{
        p: spacing,
        flexGrow: 1,
      }}
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
        Question generation Tutorial
      </Typography>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Typography variant="body1" sx={{ fontFamily: "serif" }}>
          Let's take a closer look at how everything works, and don't forget to
          fill in the survey to help make the tool better once you're
          done!&nbsp;&nbsp;
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://forms.gle/2trxnp6urSNq22xAA"
          >
            Survey ヽ(ˋДˊ)ノ
          </Link>
          <br />
          <br />
          <b>Input Options:</b> To get started, you have two options shown in
          the code editor on the left: You can either input a prompt to generate
          code using AI (By clicking on the “Prompt” button), or you can enter
          your own code directly into the code editor on the left (By clicking
          on the “Custom Code” button). Choose the method that suits you best.
          <br />
          <br />
          <b>Prompt option:</b> Is there a concept you learnt in CS101 bugging
          you? Maybe a nested loop, or is it a matrix, or file reading in
          python? Enter them in the prompt option with your preferred language
          E.g. nested loop Python. Provide more details in the prompt for
          different and more personalised examples to get more practice on. E.g.
          Generate a nested loop in python that calculates the sum of a 2D
          array.
          <br />
          <br />
          <b>
            Not sure what prompt to to put in? Check out some of our{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/document/d/1lHpkDB--OyMxE8ibWdQlXY8PF16XFAgiggyWmFuhMnw/edit?usp=sharing"
            >
              example prompts
            </Link>
          </b>
          <br />
          <br />
          <b>Custom Code option:</b> Maybe there is a code snippet shown in your
          CS101 lectures that you don’t understand, feel free to copy and paste
          them using the custom code option.
          <br />
          <br />
          <b>Questions:</b> Once you have your code ready, click the "Generate
          Questions" button. You'll see a list of questions on the right, each
          labelled with a difficulty level. These questions will help you assess
          your comprehension of the code.
          <br />
          <br />
          <b>Feedback and Follow-up:</b> After submitting your answers, our AI
          will automatically evaluate them. You'll receive instant feedback on
          your performance. If you're unsure about a question, no problem! You
          can request explanations and even ask follow-up questions in the
          feedback section.
          <br />
          <br />
          <b>Line-by-Line Explanation:</b> While exploring your code, if you
          encounter a line you'd like to understand better, simply go onto the
          explanations tab, highlight the line confusing you, and click
          “Generate Explanation”. A detailed explanation will appear, helping
          you grasp the function of that line, as well as its purpose with
          regards to the overall program.
          <br />
          <br />
          Feel free to explore, learn, and challenge yourself with different
          programs and prompts!
        </Typography>
      </div>
    </Stack>
  );
}
