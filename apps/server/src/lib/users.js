"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.getUserById = exports.addUser = exports.getUsers = void 0;
let users = [];
const getUsers = () => users;
exports.getUsers = getUsers;
const addUser = (id, name) => {
    const newUser = {
        name: name || `Player ${users.length + 1}`,
        id,
    };
    users = [...users, newUser];
    return newUser.id;
};
exports.addUser = addUser;
const getUserById = (id) => users.find((u) => u.id === id);
exports.getUserById = getUserById;
const removeUser = (id) => {
    if (id) {
        users = users.filter((u) => u.id !== id);
    }
};
exports.removeUser = removeUser;
