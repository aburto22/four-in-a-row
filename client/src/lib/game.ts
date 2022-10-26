import { IBoard, IUser, IToken } from "@types";

const checkHorizontalWinner = (board: IBoard, token: IToken): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) =>
    token === board[x][y] &&
    token === board[x + 1][y] &&
    token === board[x + 2][y] &&
    token === board[x + 3][y];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkVerticalWinner = (board: IBoard, token: IToken): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) =>
    token === board[x][y] &&
    token === board[x][y + 1] &&
    token === board[x][y + 2] &&
    token === board[x][y + 3];

  for (let x = 0; x < board.length; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkDiagonal1Winner = (board: IBoard, token: IToken): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) =>
    token === board[x][y] &&
    token === board[x + 1][y + 1] &&
    token === board[x + 2][y + 2] &&
    token === board[x + 3][y + 3];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkDiagonal2Winner = (board: IBoard, token: IToken): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) =>
    token === board[x][y + 3] &&
    token === board[x + 1][y + 2] &&
    token === board[x + 2][y + 1] &&
    token === board[x + 3][y];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

export const checkWinner = (board: IBoard, token: IToken): boolean => {
  if (
    checkHorizontalWinner(board, token) ||
    checkVerticalWinner(board, token) ||
    checkDiagonal1Winner(board, token) ||
    checkDiagonal2Winner(board, token)
  ) {
    return true;
  }

  return false;
};

export const checkMatchNull = (board: IBoard): boolean =>
  board.every((c) => c.every((t) => t !== null));

export const addToken = (
  board: IBoard,
  index: number,
  token: IToken
): IBoard | null => {
  const columnIndex = index;
  const currentBoard = board;
  const currentColumn = currentBoard[columnIndex];
  const rowIndex = currentColumn.findIndex((t) => t === null);

  if (rowIndex === -1) {
    return null;
  }

  const newColumn = currentColumn.map((t, i) => {
    if (i === rowIndex) {
      return token;
    }
    return t;
  });
  return currentBoard.map((c, i) => {
    if (i === columnIndex) {
      return newColumn;
    }
    return c;
  });
};

export const getActivePlayerMessage = (
  players: IUser[],
  activePlayer: string,
  myId: string
): string => {
  if (activePlayer === myId) {
    return "It's your turn!";
  }
  const activePlayerName = players.find((p) => p.id === activePlayer)?.name;
  return `${activePlayerName} is playing`;
};

export const getWinnerMessage = (
  players: IUser[],
  activePlayer: string,
  myId: string
): string => {
  if (activePlayer !== myId) {
    return "You have won this match!";
  }
  const activePlayerName = players.find((p) => p.id !== activePlayer)?.name;
  return `${activePlayerName} has won the game`;
};

export const getPlayerToken = (
  players: IUser[],
  activePlayer: string
): IToken => {
  const playerIndex = players.findIndex((p) => p.id !== activePlayer) + 1;
  return `P${playerIndex}`;
};
