import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../context/WorkspaceContextProvider";

export default function ExplanationsPanel() {
  const [isLinesHighlighted, setIsLinesHighlighted] = useState(false);
  const { highlightedLines, setHighlightedLines } =
    useContext(WorkspaceContext);

  function handleGetHighlightedLines() {
    setIsLinesHighlighted(true);
  }

  function test() {
    console.log("Highlighted lines:", highlightedLines);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          {highlightedLines.length > 0 ? (
            <Typography variant="body2">{highlightedLines}</Typography>
          ) : (
            <Typography variant="body2">
              Start by highlighting lines of code that you don't understand
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" onClick={test}>
          Get Highlighted Lines
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body1">
          <Button variant="contained" disabled={!isLinesHighlighted}>
            Generate Explanation
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}
