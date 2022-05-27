import { v4 } from 'uuid';
import { getUserById } from './users';
import type { IRoom } from '../types';

let waitingRoom: IRoom = {
  id: v4(),
  type: 'waiting',
  users: [],
};

let rooms: IRoom[] = [waitingRoom];

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

  rooms = rooms.map((r) => (r.type === 'waiting' ? waitingRoom : r));
};

export const removeUserFromWaitingRoom = (userId: string) => {
  waitingRoom = {
    ...waitingRoom,
    users: waitingRoom.users.filter((u) => u.id !== userId),
  };

  rooms = rooms.map((r) => (r.type === 'waiting' ? waitingRoom : r));
};

export const getRooms = () => rooms;

export const getRoomById = (roomId: string) => rooms.find((r) => r.id === roomId);

export const createRoom = () => {
  const newRoom: IRoom = {
    id: v4(),
    type: 'game',
    users: [],
  };

  rooms = [...rooms, newRoom];

  return newRoom;
};

export const removeRoom = (roomId: string) => {
  rooms = rooms.filter((r) => r.id !== roomId);
};

export const addUserToRoom = (roomId: string, userId: string) => {
  const room = getRooms().find((r) => r.id === roomId);
  const user = getUserById(userId);

  if (!room || !user) {
    return;
  }

  const updatedRoom: IRoom = {
    ...room,
    users: [...room.users, user],
  };

  rooms = rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r));
};

export const removeUserFromRoom = (roomId: string, userId: string) => {
  const room = getRooms().find((r) => r.id === roomId);

  if (!room) {
    return;
  }

  const updatedRoom: IRoom = {
    ...room,
    users: room.users.filter((u) => u.id !== userId),
  };

  rooms = rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r));
};

export const getRoomByUserId = (userId: string) => rooms
  .find((r) => r.users.find((u) => u.id === userId));
