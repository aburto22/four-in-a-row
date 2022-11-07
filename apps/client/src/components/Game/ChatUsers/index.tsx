import { useAppSelector } from "@hooks/redux";
import Svg from "@components/Svg";
import * as styles from "./styles";
import { capitalize } from "@lib/chat";

type ChatUserWrapProps = {
  name: string;
  children: React.ReactNode;
  isUser: boolean;
};

function ChatUserWrap({ name, children, isUser }: ChatUserWrapProps) {
  return (
    <styles.User key={name} isUser={isUser}>
      <Svg name="avatar" width={22} fill="green" stroke="none" />
      {capitalize(name)}
      <styles.Info>{children}</styles.Info>
    </styles.User>
  );
}

export default function ChatUsers() {
  const chat = useAppSelector((state) => state.chat);
  const username = useAppSelector((state) => state.user.name);
  const activePlayerId = useAppSelector((state) => state.game.activePlayerId);

  return (
    <styles.Container>
      <styles.Users>
        {chat.status === "playing" &&
          chat.users.map((user) => (
            <ChatUserWrap
              key={user.id}
              name={user.name}
              isUser={username === user.name}
            >
              {activePlayerId === user.id && (
                <styles.Playing>playing</styles.Playing>
              )}
              <styles.Color token={user.token} />
            </ChatUserWrap>
          ))}
      </styles.Users>
    </styles.Container>
  );
}
