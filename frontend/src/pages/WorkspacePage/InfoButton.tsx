import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import { spacing } from "./SharedStyles";
import { useContext } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContextProvider";

export default function InfoButton() {
  const { setTutorialOpen } = useContext(WorkspaceContext);

  function handleClick() {
    setTutorialOpen(true);
  }

  return (
    <IconButton
      sx={{
        zIndex: 100,
        position: "absolute",
        bottom: spacing * 10,
        left: spacing * 10,

        p: 0,
      }}
      onClick={handleClick}
    >
      <InfoIcon sx={{ color: "white", fontSize: "40px" }} />
    </IconButton>
  );
}
