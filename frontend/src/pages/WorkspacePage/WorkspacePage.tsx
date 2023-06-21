import { Box, Grid } from "@mui/material";
import Inspector from "./Inspector/Inspector";
import Editor from "./Editor/Editor";

export default function WorkspacePage() {
  return (
    <Box
      sx={{ width: "100%", height: "100%", p: "10px", boxSizing: "border-box" }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6}>
          <Editor />
        </Grid>
        <Grid item xs={6}>
          <Inspector />
        </Grid>
      </Grid>
    </Box>
  );
}
