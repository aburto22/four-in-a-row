import React, { useEffect, useRef } from "react";
import { useAppSelector } from "@hooks/redux";
import Token from "@components/Game/Token";
import { IColumn } from "@types";
import { useSocketContext } from "@context/SocketContext";
import { useSpring, easings } from "@react-spring/web";
import * as styles from "./styles";

interface ColumnProps {
  column: IColumn;
  index: number;
}

const getTokenDropDistance = (column: IColumn): number => {
  const index = column.findIndex((t) => t === null);

  if (index === -1) {
    return 0;
  }

  return (column.length - index - 1) * (0.3 + 0.3 + 2) * 16 + 0.1 * 16;
};

const Column = ({ column, index }: ColumnProps) => {
  const columnRef = useRef<HTMLButtonElement | null>(null);
  const isColumnClicked = useRef(false);
  const activePlayerId = useAppSelector((state) => state.game.activePlayerId);
  const userId = useAppSelector((state) => state.game.myId);
  const gameStatus = useAppSelector((state) => state.game.status);
  const chat = useAppSelector((state) => state.chat);
  const socket = useSocketContext();

  const [springStyles, api] = useSpring(() => ({
    from: { opacity: 0, y: -48, display: "none" },
    config: {
      tension: 160,
      friction: 12,
      bounce: 1.3,
      easing: easings.easeOutBounce,
    },
    onRest: () => {
      if (isColumnClicked.current) {
        isColumnClicked.current = false;
        api.start({ opacity: 0, y: -48, display: "none" });
        socket.emit("playToken", index);
      }
    },
  }));

  useEffect(() => {
    const column = columnRef.current;

    const handleMouseEnter = () => {
      if (!isColumnClicked.current) {
        api.start({ opacity: 1, display: "block", y: -48 });
      }
    };

    const handleMouseLeave = () => {
      if (!isColumnClicked.current) {
        api.start({ opacity: 0, display: "none", y: -48 });
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
  }, [api]);

  const handleClick = () => {
    isColumnClicked.current = true;
    const distance = getTokenDropDistance(column);
    api.start({ opacity: 1, y: distance, display: "block" });
  };

  const Tokens = column.map((t, i) => <Token key={i} token={t} />);

  const canPlay = column.some((t) => t === null);

  const isPlayerTurn = activePlayerId === userId;

  const disabled = !isPlayerTurn || !canPlay || gameStatus !== "playing";

  const playerColor =
    chat.status === "playing"
      ? chat.users.find((u) => u.id === userId)?.token
      : undefined;

  const showPlaceholderToken = playerColor && !disabled;

  return (
    <styles.Column
      type="button"
      onClick={handleClick}
      disabled={disabled}
      ref={columnRef}
    >
      {showPlaceholderToken && (
        <styles.PlaceholderToken style={springStyles}>
          <Token token={playerColor} />
        </styles.PlaceholderToken>
      )}
      {Tokens}
    </styles.Column>
  );
};

export default Column;
