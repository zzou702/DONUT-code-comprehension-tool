import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function FeatureListComponent() {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <Typography variant="h6" align="left" sx={{ color: "#ffffff" }}>
          Automatic AI Code Generation
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <Typography variant="h6" align="left" sx={{ color: "#ffffff" }}>
          Line-by-Line Explanations
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <Typography variant="h6" align="left" sx={{ color: "#ffffff" }}>
          Dialogue based interactions
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <Typography variant="h6" align="left" sx={{ color: "#ffffff" }}>
          Probing questions
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: "#ffffff" }} />
        </ListItemIcon>
        <Typography variant="h6" align="left" sx={{ color: "#ffffff" }}>
          Instant Feedbacks
        </Typography>
      </ListItem>
    </List>
  );
}
