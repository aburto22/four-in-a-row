import { IUser, IPlayer, IGame, IBoard, IToken } from "@types";

const getActivePlayer = (game: IGame): IPlayer => {
  const activePlayer = game.players.find((p) => p.id === game.activePlayerId);

  if (!activePlayer) {
    throw new Error("Player not found");
  }

  return activePlayer;
};

const createBoard = () => Array(7).fill(Array(6).fill(null));

export const createGame = (player1: IUser, player2: IUser): IGame => {
  const startingPlayerIndex = Math.floor(Math.random() * 2);
  const startingPlayer = startingPlayerIndex === 0 ? player1 : player2;
  const secondPlayer = startingPlayerIndex === 0 ? player2 : player1;

  const players = [
    {
      ...startingPlayer,
      token: "red",
      nextPlayerId: secondPlayer.id,
    },
    {
      ...secondPlayer,
      token: "black",
      nextPlayerId: startingPlayer.id,
    },
  ] as [IPlayer, IPlayer];

  return {
    board: createBoard(),
    status: "playing",
    players,
    activePlayerId: startingPlayer.id,
    winnerName: "",
  };
};

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

export const updateGame = (game: IGame, index: number): IGame | null => {
  const activePlayer = getActivePlayer(game);

  const updatedBoard = playToken(game.board, index, activePlayer.token);

  if (!updatedBoard) {
    return null;
  }

  if (checkWinner(updatedBoard, activePlayer.token)) {
    return {
      ...game,
      board: updatedBoard,
      status: "winner",
      winnerName: activePlayer.name,
    };
  }

  if (checkMatchNull(updatedBoard)) {
    return {
      ...game,
      board: updatedBoard,
      status: "matchNull",
    };
  }

  return {
    ...game,
    board: updatedBoard,
    activePlayerId: activePlayer.nextPlayerId,
  };
};

export const playToken = (
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

export const restartGame = (game: IGame): IGame => {
  const activePlayer = getActivePlayer(game);

  return {
    ...game,
    board: createBoard(),
    activePlayerId: activePlayer.nextPlayerId,
    status: "playing",
  };
};
