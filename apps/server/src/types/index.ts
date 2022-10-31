export type { IPlayer, IToken, IColumn, IBoard, IGame } from "types/game";
import type { IPlayer, IGame } from "types/game";

export type IUser = Pick<IPlayer, "id" | "name">;

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
