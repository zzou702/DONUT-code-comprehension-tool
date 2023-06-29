import { Button, Stack, Typography } from "@mui/material";
import Panel from "../../../../../components/Panel";
import { theme } from "../../../WorkspaceTheme";
import { spacing } from "../../../SharedStyles";
import CachedIcon from "@mui/icons-material/Cached";
import { useContext, useEffect } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";

export default function FeedbackPanel() {
  const { currentQuestion } = useContext(WorkspaceContext);

  useEffect(() => {
    // TODO: remove these stub assignments
    currentQuestion.finalAnswer =
      "Nam gravida faucibus elit, sit amet dapibus nulla ullamcorper at.";

    currentQuestion.isCorrect = true;

    currentQuestion.feedback =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Posuere ac ut consequat semper viverra nam. Pellentesque habitant morbi tristique senectus et. Turpis egestas integer eget aliquet nibh. Et ultrices neque ornare aenean euismod elementum nisi quis. Ullamcorper velit sed ullamcorper morbi tincidunt. Nunc lobortis mattis aliquam faucibus purus. Tincidunt praesent semper feugiat nibh sed pulvinar. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. At urna condimentum mattis pellentesque id. Adipiscing at in tellus integer feugiat scelerisque. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Viverra suspendisse potenti nullam ac tortor vitae purus. Vestibulum sed arcu non odio euismod lacinia at quis. Cras sed felis eget velit aliquet sagittis id consectetur. Risus pretium quam vulputate dignissim suspendisse in est ante. Egestas integer eget aliquet nibh praesent. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.";
  }, []);

  return (
    <Stack
      spacing={spacing}
      sx={{
        height: "-webkit-fill-available", // FIXME: not respecting padding at bottom
        boxSizing: "border-box",
        p: spacing,
        textAlign: "left",
        overflow: "scroll",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {currentQuestion.isCorrect
          ? "Your answer was correct!"
          : "Your answer was incorrect."}
      </Typography>
      <Panel
        sx={{
          backgroundColor: "#ddd",
          // color: "white",
          p: spacing,
        }}
      >
        {currentQuestion.finalAnswer}
      </Panel>

      <Typography variant="h6">Feedback</Typography>
      <Typography variant="body1">{currentQuestion.feedback}</Typography>
      {/* TODO: use chat API */}
      <Button variant="outlined" endIcon={<CachedIcon />}>
        Generate Again
      </Button>
    </Stack>
  );
}
