import { v4 } from "uuid";
import { getUserById } from "@lib/users";
import type { IGameRoom, IRoom, IUser, IGame } from "@types";
import { createGame } from "./game";

let waitingRoom: IRoom = {
  id: v4(),
  type: "waiting",
  users: [],
};

let gameRooms: IGameRoom[] = [];

export const getWaitingRoom = () => waitingRoom;

export const addUserToWaitingRoom = (userId: string) => {
  const user = getUserById(userId);

  if (!user) {
    return;
  }

  waitingRoom = {
    ...waitingRoom,
    users: [...waitingRoom.users, user],
  };
};

export const removeUserFromWaitingRoom = (userId: string) => {
  waitingRoom = {
    ...waitingRoom,
    users: waitingRoom.users.filter((u) => u.id !== userId),
  };
};

export const getGameRooms = () => gameRooms;

export const getRoomById = (roomId: string): IRoom | undefined => {
  if (waitingRoom.id === roomId) {
    return waitingRoom;
  }
  return gameRooms.find((r) => r.id === roomId);
};

export const createRoom = (users: [IUser, IUser]) => {
  const newRoom: IGameRoom = {
    id: v4(),
    type: "game",
    users: users,
    game: createGame(...users),
  };

  gameRooms = [...gameRooms, newRoom];

  return newRoom;
};

export const removeGameRoom = (roomId: string) => {
  const room = getRoomById(roomId);

  if (!room) {
    return;
  }

  room.users.forEach((u) => addUserToWaitingRoom(u.id));

  gameRooms = gameRooms.filter((r) => r.id !== roomId);
};

export const removeUserFromRoom = (roomId: string, userId: string) => {
  if (waitingRoom.id === roomId) {
    waitingRoom = {
      ...waitingRoom,
      users: waitingRoom.users.filter((u) => u.id !== userId),
    };
    return;
  }
  const gameRoom = getGameRooms().find((r) => r.id === roomId);

  if (!gameRoom) {
    return;
  }

  const otherUsers = gameRoom.users.filter((u) => u.id !== userId);

  gameRooms = gameRooms.filter((r) => r.id !== gameRoom.id);

  otherUsers.forEach((u) => addUserToWaitingRoom(u.id));
};

export const getRoomByUserId = (userId: string): IRoom | undefined => {
  if (waitingRoom.users.findIndex((u) => u.id === userId) >= 0) {
    return waitingRoom;
  }
  return gameRooms.find((r) => r.users.find((u) => u.id === userId));
};

export const getGameRoomByUserId = (userId: string): IGameRoom | undefined =>
  gameRooms.find((r) => r.users.find((u) => u.id === userId));

export const updateGameRoom = (roomId: string, updatedGame: IGame): void => {
  gameRooms = gameRooms.map((room) => {
    if (room.id !== roomId) {
      return room;
    }
    return {
      ...room,
      game: updatedGame,
    };
  });
};
