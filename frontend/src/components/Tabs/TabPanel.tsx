import { ReactElement } from "react";

interface Props {
  children?: ReactElement | ReactElement[];
  index: number;
  value: number;
  style?: React.CSSProperties;
}

export default function TabPanel(props: Props) {
  return (
    <div style={props.style} hidden={props.value !== props.index}>
      {props.value === props.index && <>{props.children}</>}
    </div>
  );
}
