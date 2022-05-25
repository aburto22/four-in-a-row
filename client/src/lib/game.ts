import { IBoard, IPlayer, IUser } from '../types';

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
  if (checkHorizontalWinner(board, player)
    || checkVerticalWinner(board, player)
    || checkDiagonal1Winner(board, player)
    || checkDiagonal2Winner(board, player)) {
    return true;
  }

  return false;
};

export const checkMatchNull = (board: IBoard): boolean => (
  board.every((c) => c.every((t) => t !== null))
);

export const addToken = (board: IBoard, index: number, player: IPlayer): IBoard | null => {
  const columnIndex = index;
  const currentBoard = board;
  const currentColumn = currentBoard[columnIndex];
  const rowIndex = currentColumn.findIndex((t) => t === null);

  if (rowIndex === -1) {
    return null;
  }

  const newColumn = currentColumn.map((t, i) => {
    if (i === rowIndex) {
      return player;
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
  myId: string,
): string => {
  if (activePlayer === myId) {
    return 'It\'s your turn!';
  }
  const activePlayerName = players.find((p) => p.id === activePlayer)?.name;
  return `${activePlayerName} is playing`;
};

export const getWinnerMessage = (
  players: IUser[],
  activePlayer: string,
  myId: string,
): string => {
  if (activePlayer !== myId) {
    return 'You have won this match!';
  }
  const activePlayerName = players.find((p) => p.id !== activePlayer)?.name;
  return `${activePlayerName} has won the game`;
};
