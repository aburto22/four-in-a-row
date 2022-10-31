import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("Socket not defined");
  }

  return socket;
};

export default SocketContext;
