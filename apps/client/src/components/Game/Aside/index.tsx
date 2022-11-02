import Chat from "../Chat";
import ChatUsers from "../ChatUsers";
import * as styles from "./styles";

export default function Aside() {
  return (
    <styles.Aside>
      <ChatUsers />
      <Chat />
    </styles.Aside>
  );
}
