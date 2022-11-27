import * as styles from "./styles";
import { useSpring, easings } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Token from "../Token";
import { useEffect } from "react";
import { getTokenDropDistance, getTokenSideDistance } from "@lib/game";
import { useSocketContext } from "@context/SocketContext";
import { resetToken } from "@slices/placeholderToken";

const PlaceholderToken = () => {
  const placeholderToken = useAppSelector((state) => state.placeholderToken);
  const column = useAppSelector(
    (state) => state.game.board[placeholderToken.index]
  );
  const dispatch = useAppDispatch();
  const socket = useSocketContext();

  const [springStyles, api] = useSpring(() => ({
    from: { opacity: 1, y: -48, x: 0, display: "block" },
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

    api.pause(["opacity", "x", "display"]);
    api.start({
      y: getTokenDropDistance(column),
      onRest: () => {
        const index = placeholderToken.index;

        api.resume(["opacity", "x", "display"]);
        api.start({ opacity: 1, y: -48, display: "block" });
        socket.emit("playToken", index);
        socket.emit("thinkingMove", { index, token: null, display: false });
        dispatch(resetToken());
      },
    });
  }, [
    placeholderToken.isClicked,
    column,
    api,
    dispatch,
    placeholderToken.index,
    socket,
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
