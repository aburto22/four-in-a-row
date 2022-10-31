"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartGame = exports.playToken = exports.updateGame = exports.checkMatchNull = exports.checkWinner = exports.createGame = void 0;
const getActivePlayer = (game) => {
    const activePlayer = game.players.find((p) => p.id === game.activePlayerId);
    if (!activePlayer) {
        throw new Error("Player not found");
    }
    return activePlayer;
};
const createBoard = () => Array(7).fill(Array(6).fill(null));
const createGame = (player1, player2) => {
    const startingPlayerIndex = Math.floor(Math.random() * 2);
    const startingPlayer = startingPlayerIndex === 0 ? player1 : player2;
    const secondPlayer = startingPlayerIndex === 0 ? player2 : player1;
    const players = [
        Object.assign(Object.assign({}, startingPlayer), { token: "red", nextPlayerId: secondPlayer.id }),
        Object.assign(Object.assign({}, secondPlayer), { token: "black", nextPlayerId: startingPlayer.id }),
    ];
    return {
        board: createBoard(),
        status: "playing",
        players,
        activePlayerId: startingPlayer.id,
        winnerName: "",
    };
};
exports.createGame = createGame;
const checkHorizontalWinner = (board, token) => {
    const columnHeight = board[0].length;
    const checker = (x, y) => token === board[x][y] &&
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
const checkVerticalWinner = (board, token) => {
    const columnHeight = board[0].length;
    const checker = (x, y) => token === board[x][y] &&
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
const checkDiagonal1Winner = (board, token) => {
    const columnHeight = board[0].length;
    const checker = (x, y) => token === board[x][y] &&
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
const checkDiagonal2Winner = (board, token) => {
    const columnHeight = board[0].length;
    const checker = (x, y) => token === board[x][y + 3] &&
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
const checkWinner = (board, token) => {
    if (checkHorizontalWinner(board, token) ||
        checkVerticalWinner(board, token) ||
        checkDiagonal1Winner(board, token) ||
        checkDiagonal2Winner(board, token)) {
        return true;
    }
    return false;
};
exports.checkWinner = checkWinner;
const checkMatchNull = (board) => board.every((c) => c.every((t) => t !== null));
exports.checkMatchNull = checkMatchNull;
const updateGame = (game, index) => {
    const activePlayer = getActivePlayer(game);
    const updatedBoard = (0, exports.playToken)(game.board, index, activePlayer.token);
    if (!updatedBoard) {
        return null;
    }
    if ((0, exports.checkWinner)(updatedBoard, activePlayer.token)) {
        return Object.assign(Object.assign({}, game), { board: updatedBoard, status: "winner", winnerName: activePlayer.name });
    }
    if ((0, exports.checkMatchNull)(updatedBoard)) {
        return Object.assign(Object.assign({}, game), { board: updatedBoard, status: "matchNull" });
    }
    return Object.assign(Object.assign({}, game), { board: updatedBoard, activePlayerId: activePlayer.nextPlayerId });
};
exports.updateGame = updateGame;
const playToken = (board, index, token) => {
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
exports.playToken = playToken;
const restartGame = (game) => {
    const activePlayer = getActivePlayer(game);
    return Object.assign(Object.assign({}, game), { board: createBoard(), activePlayerId: activePlayer.nextPlayerId, status: "playing" });
};
exports.restartGame = restartGame;
