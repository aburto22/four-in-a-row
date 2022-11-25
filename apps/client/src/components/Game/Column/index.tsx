import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { getTokenDropDistance } from "@lib/game";
import { useSocketContext } from "@context/SocketContext";
import { useSpring, easings } from "@react-spring/web";
import * as styles from "./styles";
import { useDispatch } from "react-redux";
import { setToken } from "@slices/placeholderToken";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column = ({ column, index }: ColumnProps) => {
  const columnRef = useRef<HTMLButtonElement | null>(null);
  const isColumnClicked = useRef(false);
  const activePlayerId = useAppSelector((state) => state.game.activePlayerId);
  const userId = useAppSelector((state) => state.game.myId);
  const gameStatus = useAppSelector((state) => state.game.status);
  const socket = useSocketContext();
  const placeholderToken = useAppSelector((state) => state.placeholderToken);
  const chat = useAppSelector((state) => state.chat);
  const dispatch = useDispatch();

  const isPlayerTurn = activePlayerId === userId;

  const [springStyles, api] = useSpring(() => ({
    from: { opacity: 1, y: -48, display: "block" },
    config: {
      tension: 160,
      friction: 12,
      bounce: 1.3,
      easing: easings.easeOutBounce,
    },
    onRest: () => {
      if (isColumnClicked.current) {
        isColumnClicked.current = false;
        api.start({ opacity: 1, y: -48, display: "block" });
        socket.emit("playToken", index);
        socket.emit("thinkingMove", { index, token: null });
        dispatch(setToken({ index, token: null }));
      }
    },
  }));

  useEffect(() => {
    const column = columnRef.current;

    const handleMouseEnter = () => {
      // if (!isColumnClicked.current && isPlayerTurn) {
      //   api.start({ opacity: 1, display: "block", y: -48 });
      //   socket.emit("thinkingMove", index);
      // }
      if (chat.status === "playing") {
        const token = chat.users.find((p) => p.id === userId)?.token || null;
        dispatch(setToken({ index, token }));
        socket.emit("thinkingMove", { index, token });
      }
    };

    const handleMouseLeave = () => {
      // if (!isColumnClicked.current && isPlayerTurn) {
      //   api.start({ opacity: 0, display: "none", y: -48 });
      // }
      if (chat.status === "playing") {
        dispatch(setToken({ index, token: null }));
        socket.emit("thinkingMove", { index, token: null });
      }
    };

    if (column) {
      column.addEventListener("mouseenter", handleMouseEnter);
      column.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (column) {
        column.removeEventListener("mouseenter", handleMouseEnter);
        column.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [
    api,
    isPlayerTurn,
    index,
    socket,
    dispatch,
    userId,
    chat.status,
    chat.users,
  ]);

  const handleClick = () => {
    isColumnClicked.current = true;
    const distance = getTokenDropDistance(column);
    api.start({ opacity: 1, y: distance, display: "block" });
  };

  const canPlay = column.some((t) => t === null);

  const disabled = !isPlayerTurn || !canPlay || gameStatus !== "playing";

  const showPlaceholderToken =
    placeholderToken.index === index &&
    placeholderToken.token &&
    gameStatus === "playing";

  console.log({ placeholderToken, showPlaceholderToken });

  return (
    <styles.Column
      type="button"
      onClick={handleClick}
      disabled={disabled}
      ref={columnRef}
    >
      {showPlaceholderToken && (
        <styles.PlaceholderToken style={springStyles}>
          <Token token={placeholderToken.token} />
        </styles.PlaceholderToken>
      )}
      {column.map((t, i) => (
        <Token key={i} token={t} />
      ))}
    </styles.Column>
  );
};

export default Column;
