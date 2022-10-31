import { IPlayer } from "@types";

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
