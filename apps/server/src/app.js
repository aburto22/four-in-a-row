"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const users_1 = require("@lib/users");
const rooms_1 = require("@lib/rooms");
const messages_1 = require("@lib/messages");
const game_1 = require("@lib/game");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const chatBot = "Chat Bot";
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://four-in-a-row-sockets.vercel.app",
        ],
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.static(path_1.default.join("..", "client", "build")));
io.on("connection", (socket) => {
    const user = {
        id: socket.id,
        name: "",
    };
    socket.emit("message", (0, messages_1.createMessage)(chatBot, "Welcome!"));
    socket.on("setUpPlayer", (name) => __awaiter(void 0, void 0, void 0, function* () {
        const { id: waitingRoomId } = (0, rooms_1.getWaitingRoom)();
        (0, users_1.addUser)(user.id, name);
        user.name = name;
        (0, rooms_1.addUserToWaitingRoom)(user.id);
        socket.join(waitingRoomId);
        socket.emit("assignUserId", user.id);
    }));
    socket.on("startGame", () => {
        const waitingRoom = (0, rooms_1.getWaitingRoom)();
        const { users } = waitingRoom;
        if (users.length >= 2) {
            const firstTwoUsers = users.slice(0, 2);
            const room = (0, rooms_1.createRoom)(firstTwoUsers);
            firstTwoUsers.forEach((u) => {
                var _a;
                (0, rooms_1.removeUserFromWaitingRoom)(u.id);
                const opponentName = (_a = firstTwoUsers.find((ou) => ou.id !== u.id)) === null || _a === void 0 ? void 0 : _a.name;
                const text = `${opponentName} has joined your room.`;
                const s = io.sockets.sockets.get(u.id);
                s === null || s === void 0 ? void 0 : s.leave(waitingRoom.id);
                s === null || s === void 0 ? void 0 : s.join(room.id);
                s === null || s === void 0 ? void 0 : s.emit("message", (0, messages_1.createMessage)(chatBot, text));
            });
            io.in(room.id).emit("play", room.game);
            io.in(room.id).emit("message", (0, messages_1.createMessage)(chatBot, "Game starts now!"));
        }
    });
    socket.on("playToken", ({ index }) => {
        const room = (0, rooms_1.getGameRoomByUserId)(user.id);
        if (!room) {
            console.error("no room!");
            return;
        }
        const updatedGame = (0, game_1.updateGame)(room.game, index);
        if (!updatedGame) {
            io.in(room.id).emit("invalidPlay");
            return;
        }
        (0, rooms_1.updateGameRoom)(room.id, updatedGame);
        if (updatedGame.status === "winner") {
            const text = `The game is over. ${updatedGame.winnerName} has won. Ready for a re-match?`;
            io.in(room.id).emit("message", (0, messages_1.createMessage)(chatBot, text));
        }
        if (updatedGame.status === "matchNull") {
            io.in(room.id).emit("message", (0, messages_1.createMessage)(chatBot, "The game is a tie!"));
        }
        io.in(room.id).emit("play", updatedGame);
    });
    socket.on("resetGame", () => {
        const room = (0, rooms_1.getGameRoomByUserId)(user.id);
        if (!room) {
            console.error("no room!");
            return;
        }
        const newGame = (0, game_1.restartGame)(room.game);
        (0, rooms_1.updateGameRoom)(room.id, newGame);
        io.in(room.id).emit("play", newGame);
        io.in(room.id).emit("message", (0, messages_1.createMessage)(chatBot, "Game has restarted."));
    });
    socket.on("disconnect", () => {
        const room = (0, rooms_1.getRoomByUserId)(user.id);
        if (!room) {
            console.error("no room!");
            return;
        }
        const otherUsers = room.users.filter((u) => u.id !== user.id);
        (0, users_1.removeUser)(user.id);
        (0, rooms_1.removeUserFromRoom)(room.id, user.id);
        if (room.type === "waiting") {
            return;
        }
        const { id: waitingRoomId } = (0, rooms_1.getWaitingRoom)();
        otherUsers === null || otherUsers === void 0 ? void 0 : otherUsers.forEach((u) => {
            const s = io.sockets.sockets.get(u.id);
            s === null || s === void 0 ? void 0 : s.emit("quitGame");
            const text = `${user.name} has quit the game. You have been re-assigned to the waiting room.`;
            s === null || s === void 0 ? void 0 : s.emit("message", (0, messages_1.createMessage)(chatBot, text));
            s === null || s === void 0 ? void 0 : s.leave(room.id);
            s === null || s === void 0 ? void 0 : s.join(waitingRoomId);
        });
    });
    socket.on("message", ({ text }) => {
        const room = (0, rooms_1.getRoomByUserId)(user.id);
        if (!room) {
            console.error("no room!");
            return;
        }
        io.to(room.id).emit("message", (0, messages_1.createMessage)(user.name, text));
    });
});
exports.default = server;
