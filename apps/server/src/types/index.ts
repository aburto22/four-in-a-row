export type {
  IPlayer,
  IUser,
  IToken,
  IColumn,
  IBoard,
  IGame,
  IMessage,
  ClientToServerEvents,
  ServerToClientEvents,
} from "types/game";
import type { IUser, IGame } from "types/game";

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
