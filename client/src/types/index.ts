export type IPlayer = number;

export type IToken = number;

export type IColumn = Array<IToken | null>;

export type IBoard = Array<IColumn>;

export interface IUser {
  name: string;
  id: string;
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
