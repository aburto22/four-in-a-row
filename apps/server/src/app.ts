import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { addUser, removeUser } from "@lib/users";
import {
  getWaitingRoom,
  addUserToWaitingRoom,
  removeUserFromWaitingRoom,
  removeUserFromRoom,
  createRoom,
  getRoomByUserId,
  getGameRoomByUserId,
  updateGameRoom,
} from "@lib/rooms";
import { createMessage } from "@lib/messages";
import type { IUser, ClientToServerEvents, ServerToClientEvents } from "@types";
import { restartGame, updateGame } from "@lib/game";

const app = express();
const server = createServer(app);

const chatBot = "Chat Bot";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://four-in-a-row-sockets.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join("..", "client", "build")));

io.on("connection", (socket) => {
  const user: IUser = {
    id: socket.id,
    name: "",
  };

  socket.emit("message", createMessage(chatBot, "Welcome!"));

  socket.on("setUpPlayer", async (name) => {
    const { id: waitingRoomId } = getWaitingRoom();

    addUser(user.id, name);
    user.name = name;

    addUserToWaitingRoom(user.id);
    socket.join(waitingRoomId);

    const { users } = getWaitingRoom();

    socket.emit("assignUserId", user.id);

    io.in(waitingRoomId).emit("updateChatUsers", { status: "waiting", users });
  });

  socket.on("startGame", () => {
    const { users, id: waitingRoomId } = getWaitingRoom();

    if (users.length < 2) {
      return;
    }

    const firstTwoUsers = users.slice(0, 2) as [IUser, IUser];
    const room = createRoom(firstTwoUsers);

    firstTwoUsers.forEach((u) => {
      removeUserFromWaitingRoom(u.id);

      const opponentName = firstTwoUsers.find((ou) => ou.id !== u.id)?.name;
      const text = `${opponentName} has joined your room.`;

      const s = io.sockets.sockets.get(u.id);
      s?.leave(waitingRoomId);
      s?.join(room.id);
      s?.emit("message", createMessage(chatBot, text));
    });

    io.in(room.id).emit("start", room.game);
    io.in(room.id).emit("message", createMessage(chatBot, "Game starts now!"));
    io.in(room.id).emit("updateChatUsers", {
      status: "playing",
      users: room.game.players,
    });

    const { users: updatedUsers } = getWaitingRoom();
    io.in(waitingRoomId).emit("updateChatUsers", {
      status: "waiting",
      users: updatedUsers,
    });
  });

  socket.on("thinkingMove", (data) => {
    const room = getGameRoomByUserId(user.id);

    if (!room) {
      console.error("no room!");
      return;
    }

    socket.in(room.id).emit("thinkingMove", data);
  });

  socket.on("playToken", (index) => {
    const room = getGameRoomByUserId(user.id);

    if (!room) {
      console.error("no room!");
      return;
    }

    const updatedGame = updateGame(room.game, index);

    if (!updatedGame) {
      io.in(room.id).emit("invalidPlay");
      return;
    }

    updateGameRoom(room.id, updatedGame);

    if (updatedGame.status === "winner") {
      const text = `The game is over. ${updatedGame.winnerName} has won. Ready for a re-match?`;

      io.in(room.id).emit("message", createMessage(chatBot, text));
    }

    if (updatedGame.status === "matchNull") {
      io.in(room.id).emit(
        "message",
        createMessage(chatBot, "The game is a tie!")
      );
    }

    io.in(room.id).emit("play", updatedGame);
  });

  socket.on("resetGame", () => {
    const room = getGameRoomByUserId(user.id);

    if (!room) {
      console.error("no room!");
      return;
    }

    const newGame = restartGame(room.game);

    updateGameRoom(room.id, newGame);

    io.in(room.id).emit("play", newGame);
    io.in(room.id).emit(
      "message",
      createMessage(chatBot, "Game has restarted.")
    );
  });

  socket.on("disconnect", () => {
    const room = getRoomByUserId(user.id);

    if (!room) {
      console.error("no room!");
      return;
    }

    const otherUsers = room.users.filter((u) => u.id !== user.id);
    removeUser(user.id);

    removeUserFromRoom(room.id, user.id);

    if (room.type === "waiting") {
      const { id: waitingRoomId, users } = getWaitingRoom();
      io.in(waitingRoomId).emit("updateChatUsers", {
        status: "waiting",
        users,
      });
      return;
    }

    const { id: waitingRoomId } = getWaitingRoom();

    otherUsers?.forEach((u) => {
      const s = io.sockets.sockets.get(u.id);
      s?.emit("quitGame");
      const text = `${user.name} has quit the game. You have been re-assigned to the waiting room.`;
      s?.emit("message", createMessage(chatBot, text));
      s?.leave(room.id);
      s?.join(waitingRoomId);
    });

    const { users } = getWaitingRoom();

    io.in(waitingRoomId).emit("updateChatUsers", { status: "waiting", users });
  });

  socket.on("message", (text) => {
    const room = getRoomByUserId(user.id);

    if (!room) {
      console.error("no room!");
      return;
    }

    io.to(room.id).emit("message", createMessage(user.name, text));
  });
});

export default server;
