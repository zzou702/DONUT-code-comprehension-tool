import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function ExplanationsPanel() {
  const [isLinesHighlighted, setIsLinesHighlighted] = useState(false);
  const { highlightedLines, setHighlightedLines } =
    useContext(WorkspaceContext);
  const [generatedExplanation, setGeneratedExplanation] = useState<string>();

  useEffect(() => {
    setIsLinesHighlighted(highlightedLines.length > 0);
  }, [highlightedLines]);

  function onGenerateButtonClicked() {
    console.log("button clicked");
    // TODO: call ai backend to generate explanation
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mx: 4 }}>
          <Typography variant="body2">
            Start by highlighting lines of code that you don't understand
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {highlightedLines.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
              mx: 4,
              p: 1,
              backgroundColor: "#e3e3e3",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" align="left">
              {highlightedLines[0].split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{generatedExplanation}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mx: 4 }}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <Button
            variant="contained"
            disabled={!isLinesHighlighted}
            onClick={onGenerateButtonClicked}
          >
            Generate Explanation
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}
