export interface IPlayer {
  id: string;
  name: string;
  token: IToken;
  nextPlayerId: string;
}

export type IToken = "red" | "black";

export type IColumn = Array<IToken | null>;

export type IBoard = IColumn[];

export type IGame = {
  board: IBoard;
  players: [IPlayer, IPlayer];
  activePlayerId: string;
  status: "playing" | "matchNull" | "winner";
  winnerName: string;
};
