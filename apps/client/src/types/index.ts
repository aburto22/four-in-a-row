export type { IGame, IBoard, IColumn, IToken } from "types/game";

export interface IUser {
  name: string;
}

export interface IPlayer {
  name: string;
  id: string;
}

export interface IMessage {
  user: string;
  text: string;
  time: string;
  id: string;
}
