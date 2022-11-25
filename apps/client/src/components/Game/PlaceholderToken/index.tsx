import * as styles from "./styles";
import { useSpring, easings } from "@react-spring/web";
import { useAppSelector } from "@hooks/redux";
import Token from "../Token";
import { useEffect } from "react";
import { getTokenDropDistance, getTokenSideDistance } from "@lib/game";

const PlaceholderToken = () => {
  const placeholderToken = useAppSelector((state) => state.placeholderToken);
  const column = useAppSelector(
    (state) => state.game.board[placeholderToken.index]
  );

  const [springStyles, api] = useSpring(() => ({
    from: { opacity: 1, y: -48, x: 0, display: "block" },
    config: {
      tension: 160,
      friction: 12,
      bounce: 1.3,
      easing: easings.easeOutBounce,
    },
    onRest: () => {
      // if (isColumnClicked.current) {
      //   isColumnClicked.current = false;
      //   api.start({ opacity: 1, y: -48, display: "block" });
      //   socket.emit("playToken", index);
      //   socket.emit("thinkingMove", { index, token: null });
      //   dispatch(setToken({ index, token: null }));
      // }
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

    api.start({
      y: getTokenDropDistance(column),
    });
  }, [placeholderToken.isClicked, column, api]);

  const showPlaceholderToken = placeholderToken.token;

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
