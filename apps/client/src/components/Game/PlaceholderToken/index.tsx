import * as styles from "./styles";
import { useSpring, easings } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Token from "../Token";
import { useEffect } from "react";
import { getTokenDropDistance, getTokenSideDistance } from "@lib/game";
import { useSocketContext } from "@context/SocketContext";
import { resetToken } from "@slices/placeholderToken";
import { updateGame } from "@slices/game";

const PlaceholderToken = () => {
  const placeholderToken = useAppSelector((state) => state.placeholderToken);
  const column = useAppSelector(
    (state) => state.game.board[placeholderToken.index]
  );
  const dispatch = useAppDispatch();
  const socket = useSocketContext();

  const [springStyles, api] = useSpring(() => ({
    from: { y: -48, x: 0 },
    config: {
      tension: 160,
      friction: 12,
      bounce: 1.3,
      easing: easings.easeOutBounce,
    },
  }));

  useEffect(() => {
    api.start({
      x: getTokenSideDistance(placeholderToken.index),
      config: { duration: 0 },
    });
  }, [placeholderToken.index, api]);

  useEffect(() => {
    if (!placeholderToken.isClicked) {
      return;
    }

    api.pause(["x"]);
    api.start({
      y: getTokenDropDistance(column),
      config: { duration: undefined },
      onRest: () => {
        const index = placeholderToken.index;

        api.resume(["x"]);
        api.start({ y: -48, config: { duration: 0 } });
        socket.emit("thinkingMove", { index, token: null, display: false });
        dispatch(resetToken());

        if (placeholderToken.nextAction) {
          dispatch(updateGame(placeholderToken.nextAction));
        }
      },
    });
  }, [
    placeholderToken.isClicked,
    column,
    api,
    dispatch,
    placeholderToken.index,
    socket,
    placeholderToken.nextAction,
  ]);

  const showPlaceholderToken =
    placeholderToken.token &&
    (placeholderToken.display || placeholderToken.isClicked);

  if (!showPlaceholderToken) {
    return null;
  }

  return (
    <styles.PlaceholderToken style={springStyles}>
      <Token token={placeholderToken.token} />
    </styles.PlaceholderToken>
  );
};

export default PlaceholderToken;
