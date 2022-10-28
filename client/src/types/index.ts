import type { IGame as IGameServer } from "../../../server/src/types";

export type IToken = string;

export type IColumn = Array<IToken | null>;

export type IBoard = Array<IColumn>;

export type IGame = IGameServer;

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
