import Svg from "@components/Svg";
import { useState } from "react";
import Chat from "../Chat";
import ChatUsers from "../ChatUsers";
import * as styles from "./styles";

export default function Aside() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded((ie) => !ie);
  };

  return (
    <styles.Aside isExpanded={isExpanded}>
      <styles.Button onClick={handleClick}>
        <Svg name={isExpanded ? "chevron-left" : "chevron-right"} width={16} />
      </styles.Button>
      <ChatUsers />
      <Chat />
    </styles.Aside>
  );
}
