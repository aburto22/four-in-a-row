"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const uuid_1 = require("uuid");
const createMessage = (username, text) => ({
    user: username,
    id: (0, uuid_1.v4)(),
    text,
    time: Date(),
});
exports.createMessage = createMessage;
