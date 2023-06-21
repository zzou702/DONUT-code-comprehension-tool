import { Container, Grid } from "@mui/material";
import Inspector from "./Inspector/Inspector";
import Editor from "./Editor/Editor";

export default function WorkspacePage() {
  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={6}>
          <Editor />
        </Grid>
        <Grid item xs={6}>
          <Inspector />
        </Grid>
      </Grid>
    </Container>
  );
}
