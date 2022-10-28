export type { IGame, IBoard, IColumn, IToken } from "../../../server/src/types";

export interface IUser {
  name: string;
}

export interface IPlayer {
  name: string;
  id: string;
}

export interface IStartGameData {
  activePlayer: string;
  players: IPlayer[];
}

export interface IMessage {
  user: string;
  text: string;
  time: string;
  id: string;
}
