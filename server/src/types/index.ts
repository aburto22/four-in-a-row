export interface IPlayer {
  id: string;
  name: string;
  token: IToken;
  nextPlayerId: string;
}

export type IUser = Pick<IPlayer, "id" | "name">;

export type IToken = "red" | "blue";

export type IColumn = Array<IToken | null>;

export type IBoard = IColumn[];

export type IGame = {
  board: IBoard;
  players: [IPlayer, IPlayer];
  activePlayerId: string;
  status: "playing" | "matchNull" | "winner";
  winnerName: string;
};

export interface PlayTokenData {
  index: number;
  userId: string;
}

export interface MessageData {
  user: string;
  text: string;
}

export interface IRoom {
  id: string;
  type: "waiting" | "game";
  users: IUser[];
}

export interface IGameRoom {
  id: string;
  type: "game";
  users: [IUser, IUser];
  game: IGame;
}
