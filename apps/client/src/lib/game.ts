import { IPlayer, IColumn } from "@types";

export const getActivePlayerMessage = (
  players: IPlayer[],
  activePlayer: string,
  myId: string
): string => {
  if (activePlayer === myId) {
    return "It's your turn!";
  }
  const activePlayerName = players.find((p) => p.id === activePlayer)?.name;
  return `${activePlayerName} is playing`;
};

export const getTokenDropDistance = (column: IColumn): number => {
  const index = column.findIndex((t) => t === null);

  if (index === -1) {
    return 0;
  }

  return (column.length - index - 1) * (0.3 + 0.3 + 2) * 16 + 0.1 * 16;
};
