import { Box, Grid } from "@mui/material";
import Inspector from "./Inspector/Inspector";
import CodeEditor from "./CodeEditor/CodeEditor";
import { spacing } from "./SharedStyles";

export default function WorkspacePage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: spacing,
        boxSizing: "border-box",
      }}
    >
      <Grid container columnSpacing={spacing} sx={{ height: "100%" }}>
        {/* Need to explicitly pass height down to be inherited */}
        <Grid item xs={6} sx={{ height: "inherit" }}>
          <CodeEditor />
        </Grid>
        <Grid item xs={6}>
          <Inspector />
        </Grid>
      </Grid>
    </Box>
  );
}
