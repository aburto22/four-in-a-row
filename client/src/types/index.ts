export type IPlayer = number;

export type IToken = number;

export type IColumn = Array<IToken | null>;

export type IBoard = Array<IColumn>;

export interface IUser {
  name: string;
  id: string;
}

export interface IPlayTokenData {
  activePlayer: string,
  index: number,
}

export interface IStartGameData {
  activePlayer: string,
  players: IUser[],
}

// export type IColumn = [
//   IToken | null,
//   IToken | null,
//   IToken | null,
//   IToken | null,
//   IToken | null,
//   IToken | null,
// ];

// export type IBoard = [
//   IColumn,
//   IColumn,
//   IColumn,
//   IColumn,
//   IColumn,
//   IColumn,
//   IColumn,
// ];
