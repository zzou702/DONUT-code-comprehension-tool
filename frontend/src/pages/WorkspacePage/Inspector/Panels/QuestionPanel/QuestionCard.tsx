import { Stack, Typography } from "@mui/material";
import { spacing } from "../../../SharedStyles";
import { ReactElement, useEffect } from "react";
import Panel from "../../../../../components/Panel";
import DoneIcon from "@mui/icons-material/Done";
import Question from "../../../../../models/Question";

interface Props {
  number: number;
  question: Question;
}

export default function QuestionCard(props: Props) {
  return (
    <Panel sx={{ border: "none", p: spacing }}>
      <Stack direction="row">
        <Typography sx={{ fontWeight: "bold", px: spacing }}>
          {`${props.number}.`}
        </Typography>
        <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
          {props.question.description}
        </Typography>
        {props.question.isCompleted && <DoneIcon sx={{ ml: "auto" }} />}
      </Stack>
    </Panel>
  );
}
