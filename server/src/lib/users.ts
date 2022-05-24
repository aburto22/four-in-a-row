import { v4 } from 'uuid';
import type { IUser } from '../types';

let users: IUser[] = [];

export const getUsers = () => users;

export const addUser = () => {
  const newUser = {
    name: `Player ${users.length + 1}`,
    id: v4(),
  };

  users = [...users, newUser];

  return newUser.id;
};

export const getUserById = (id: string) => users.find((u) => u.id === id);

export const removeUser = (id: string | undefined) => {
  if (id) {
    users = users.filter((u) => u.id !== id);
  }
};
