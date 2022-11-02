import { useAppSelector } from "@hooks/redux";
import Svg from "@components/Svg";
import * as styles from "./styles";
import { capitalize } from "@lib/chat";

export default function ChatUsers() {
  const users = useAppSelector((state) => state.chat.users);
  const username = useAppSelector((state) => state.user.name);

  const sortedUsers = [...users].sort((a) => (a.name === username ? -1 : 0));

  return (
    <styles.Container>
      <styles.Users>
        {sortedUsers.map((user) => (
          <styles.User key={user.name}>
            <Svg name="avatar" width={22} fill="green" stroke="none" />
            {capitalize(user.name)}
          </styles.User>
        ))}
      </styles.Users>
    </styles.Container>
  );
}
