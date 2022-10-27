export type IToken = string;

export type IColumn = Array<IToken | null>;

export type IBoard = Array<IColumn>;

export interface IUser {
  name: string;
}

export interface IPlayer {
  name: string;
  id: string;
}

export interface IPlayTokenData {
  activePlayer: string;
  index: number;
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
