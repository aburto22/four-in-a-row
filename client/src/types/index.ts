import store from '../store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type IToken = number;

export type IColumn = Array<IToken | null>;

export type IBoard = Array<IColumn>;

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
