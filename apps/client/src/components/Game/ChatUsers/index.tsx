import { useAppSelector } from "@hooks/redux";
import Svg from "@components/Svg";
import * as styles from "./styles";
import { capitalize } from "@lib/chat";

export default function ChatUsers() {
  const users = useAppSelector((state) => state.chat.users);

  return (
    <styles.Container>
      <styles.Users>
        {users.map((user) => (
          <styles.User key={user.name}>
            <Svg name="avatar" width={22} fill="green" stroke="none" />
            {capitalize(user.name)}
          </styles.User>
        ))}
      </styles.Users>
    </styles.Container>
  );
}
