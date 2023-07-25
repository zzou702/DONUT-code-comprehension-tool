import { Box, Typography } from "@mui/material";
import Difficulty from "../../../../../models/Difficulty";

interface Props {
  difficulty: Difficulty;
}

export default function DifficultyTag(props: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        paddingX: 2,
        paddingY: 1,
        marginX: 0.5,
        height: "min-content",
        borderRadius: 1,
        background: props.difficulty.color,
        alignItems: "center",
      }}
    >
      <Typography
        variant="button"
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: 10,
        }}
      >
        {props.difficulty.name}
      </Typography>
    </Box>
  );
}
