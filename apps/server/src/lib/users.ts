import type { IUser } from "@types";

let users: IUser[] = [];

export const getUsers = () => users;

export const addUser = (id: string, name: string) => {
  const newUser = {
    name: name || `Player ${users.length + 1}`,
    id,
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
