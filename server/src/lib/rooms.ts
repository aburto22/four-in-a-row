import { v4 } from 'uuid';
import { getUserById } from './users';
import type { IRoom } from '../types';

const waitingRoom: IRoom = {
  id: v4(),
  type: 'waiting',
  users: [],
};

let rooms: IRoom[] = [waitingRoom];

export const getRooms = () => rooms;

export const getWaitingRoom = () => rooms.find((r) => r.type === 'waiting');

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
