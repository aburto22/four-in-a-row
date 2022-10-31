"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameRoom = exports.getGameRoomByUserId = exports.getRoomByUserId = exports.removeUserFromRoom = exports.removeGameRoom = exports.createRoom = exports.getRoomById = exports.getGameRooms = exports.removeUserFromWaitingRoom = exports.addUserToWaitingRoom = exports.getWaitingRoom = void 0;
const uuid_1 = require("uuid");
const users_1 = require("@lib/users");
const game_1 = require("./game");
let waitingRoom = {
    id: (0, uuid_1.v4)(),
    type: "waiting",
    users: [],
};
let gameRooms = [];
const getWaitingRoom = () => waitingRoom;
exports.getWaitingRoom = getWaitingRoom;
const addUserToWaitingRoom = (userId) => {
    const user = (0, users_1.getUserById)(userId);
    if (!user) {
        return;
    }
    waitingRoom = Object.assign(Object.assign({}, waitingRoom), { users: [...waitingRoom.users, user] });
};
exports.addUserToWaitingRoom = addUserToWaitingRoom;
const removeUserFromWaitingRoom = (userId) => {
    waitingRoom = Object.assign(Object.assign({}, waitingRoom), { users: waitingRoom.users.filter((u) => u.id !== userId) });
};
exports.removeUserFromWaitingRoom = removeUserFromWaitingRoom;
const getGameRooms = () => gameRooms;
exports.getGameRooms = getGameRooms;
const getRoomById = (roomId) => {
    if (waitingRoom.id === roomId) {
        return waitingRoom;
    }
    return gameRooms.find((r) => r.id === roomId);
};
exports.getRoomById = getRoomById;
const createRoom = (users) => {
    const newRoom = {
        id: (0, uuid_1.v4)(),
        type: "game",
        users: users,
        game: (0, game_1.createGame)(...users),
    };
    gameRooms = [...gameRooms, newRoom];
    return newRoom;
};
exports.createRoom = createRoom;
const removeGameRoom = (roomId) => {
    const room = (0, exports.getRoomById)(roomId);
    if (!room) {
        return;
    }
    room.users.forEach((u) => (0, exports.addUserToWaitingRoom)(u.id));
    gameRooms = gameRooms.filter((r) => r.id !== roomId);
};
exports.removeGameRoom = removeGameRoom;
const removeUserFromRoom = (roomId, userId) => {
    if (waitingRoom.id === roomId) {
        waitingRoom = Object.assign(Object.assign({}, waitingRoom), { users: waitingRoom.users.filter((u) => u.id !== userId) });
        return;
    }
    const gameRoom = (0, exports.getGameRooms)().find((r) => r.id === roomId);
    if (!gameRoom) {
        return;
    }
    const otherUsers = gameRoom.users.filter((u) => u.id !== userId);
    gameRooms = gameRooms.filter((r) => r.id !== gameRoom.id);
    otherUsers.forEach((u) => (0, exports.addUserToWaitingRoom)(u.id));
};
exports.removeUserFromRoom = removeUserFromRoom;
const getRoomByUserId = (userId) => {
    if (waitingRoom.users.findIndex((u) => u.id === userId) >= 0) {
        return waitingRoom;
    }
    return gameRooms.find((r) => r.users.find((u) => u.id === userId));
};
exports.getRoomByUserId = getRoomByUserId;
const getGameRoomByUserId = (userId) => gameRooms.find((r) => r.users.find((u) => u.id === userId));
exports.getGameRoomByUserId = getGameRoomByUserId;
const updateGameRoom = (roomId, updatedGame) => {
    gameRooms = gameRooms.map((room) => {
        if (room.id !== roomId) {
            return room;
        }
        return Object.assign(Object.assign({}, room), { game: updatedGame });
    });
};
exports.updateGameRoom = updateGameRoom;
