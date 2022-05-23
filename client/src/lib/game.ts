import { IBoard, IPlayer } from '../types';

const checkHorizontalWinner = (board: IBoard, player: IPlayer): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) => player === board[x][y]
    && player === board[x + 1][y]
    && player === board[x + 2][y]
    && player === board[x + 3][y];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkVerticalWinner = (board: IBoard, player: IPlayer): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) => player === board[x][y]
    && player === board[x][y + 1]
    && player === board[x][y + 2]
    && player === board[x][y + 3];

  for (let x = 0; x < board.length; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkDiagonal1Winner = (board: IBoard, player: IPlayer): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) => player === board[x][y]
    && player === board[x + 1][y + 1]
    && player === board[x + 2][y + 2]
    && player === board[x + 3][y + 3];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

const checkDiagonal2Winner = (board: IBoard, player: IPlayer): boolean => {
  const columnHeight = board[0].length;

  const checker = (x: number, y: number) => player === board[x][y + 3]
    && player === board[x + 1][y + 2]
    && player === board[x + 2][y + 1]
    && player === board[x + 3][y];

  for (let x = 0; x < board.length - 3; x += 1) {
    for (let y = 0; y < columnHeight - 3; y += 1) {
      if (checker(x, y)) {
        return true;
      }
    }
  }

  return false;
};

export const checkWinner = (board: IBoard, player: IPlayer): boolean => {
  if (checkHorizontalWinner(board, player)) {
    return true;
  }

  if (checkVerticalWinner(board, player)) {
    return true;
  }

  if (checkDiagonal1Winner(board, player)) {
    return true;
  }

  if (checkDiagonal2Winner(board, player)) {
    return true;
  }

  return false;
};
