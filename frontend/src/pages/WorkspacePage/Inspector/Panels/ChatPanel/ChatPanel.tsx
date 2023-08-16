import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import CachedIcon from "@mui/icons-material/Cached";
import { spacing } from "../../../SharedStyles";
import InputBox from "./InputBox";
import { useContext } from "react";
import { WorkspaceContext } from "../../../../../context/WorkspaceContextProvider";
import Panel from "../../../../../components/Panel";

export default function ChatPanel() {
  // const { chatPrompt, chatResponse, sendChatPrompt, responseLoading } =
  //   useContext(WorkspaceContext);
  // function handleGenerateAgain() {
  //   sendChatPrompt(chatPrompt);
  // }
  // return (
  //   <Stack
  //     spacing={spacing}
  //     sx={{
  //       height: "100%",
  //       boxSizing: "border-box",
  //       p: spacing,
  //     }}
  //   >
  //     {chatPrompt && (
  //       <Panel
  //         sx={{
  //           backgroundColor: "#ddd",
  //           px: spacing,
  //           py: spacing * 0.5,
  //           textAlign: "left",
  //         }}
  //       >
  //         {chatPrompt}
  //       </Panel>
  //     )}
  //     <Stack
  //       spacing={spacing}
  //       // height: 0, flexGrow: 1 to ensure question list fills up available vertical space
  //       sx={{ height: 0, flexGrow: 1, overflow: "scroll" }}
  //     >
  //       {/* Show loading symbol if response not received yet. */}
  //       {responseLoading ? (
  //         <CircularProgress
  //           // Use style instead of sx, as sx is overridden
  //           style={{ marginLeft: "auto", marginRight: "auto" }}
  //         />
  //       ) : (
  //         // component={'span'} to avoid <p> as descendent of <p> error
  //         // https://stackoverflow.com/questions/41928567/div-cannot-appear-as-a-descendant-of-p
  //         <Typography
  //           component={"span"}
  //           variant="body1"
  //           sx={{ px: spacing, textAlign: "left" }}
  //         >
  //           <ReactMarkdown>{chatResponse}</ReactMarkdown>
  //         </Typography>
  //       )}
  //     </Stack>
  //     {/* Only show generate again button if there is a response. */}
  //     {chatResponse && (
  //       <Button
  //         variant="outlined"
  //         endIcon={<CachedIcon />}
  //         onClick={handleGenerateAgain}
  //       >
  //         Generate Again
  //       </Button>
  //     )}
  //     <InputBox />
  //   </Stack>
  // );
}
