import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
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
        <Box sx={{ display: "flex", justifyContent: "left", mt: 2, mx: 4 }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: "bold" }}>
            Start by highlighting lines of code that you don't understand
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {highlightedLines.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
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

      {generatedExplanation ? (
        <>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "left", mx: 4 }}>
              <Typography variant="body1" align="left">
                Explanation:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "left", mx: 4 }}>
              <Typography variant="body1">{generatedExplanation}</Typography>
            </Box>
          </Grid>
        </>
      ) : (
        // TODO: remove and replace this with null when backend is ready
        <>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "left", mx: 4 }}>
              <Typography
                variant="body1"
                align="left"
                sx={{ fontWeight: "bold" }}
              >
                Explanation:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "left", mx: 4 }}>
              <Typography
                variant="body1"
                align="left"
                justifyContent="flex-end"
              >
                Certainly! The given line of code is a simple addition operation
                within a JavaScript function. <br />
                <br />
                Let's break it down step by step in the context of the provided
                program: <br />
                <br />
                The program defines a function called add that takes two
                parameters, a and b. This means that when you call the add
                function, you need to provide two values that will be assigned
                to the variables a and b respectively. <br />
                <br />
                Inside the function, the line return a + b; is used. This line
                performs the addition operation using the + operator between the
                variables a and b. The + operator is used for addition when
                applied to numbers. <br />
                <br />
                The return statement is used to specify the value that will be
                returned by the function. In this case, the result of the
                addition operation a + b is returned as the output of the add
                function. <br />
                <br />
                To summarize, the add function takes two parameters a and b,
                adds them together using the + operator, and returns the result.
                This means that if you call the add function with, for example,
                add(3, 4), it will return 7, because 3 + 4 equals 7.
              </Typography>
            </Box>
          </Grid>
        </>
      )}
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
            sx={{ mb: 2 }}
          >
            Generate Explanation
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}
