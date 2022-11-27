export interface IPlayer {
  id: string;
  name: string;
  token: IToken;
  nextPlayerId: string;
}

export type IUser = Pick<IPlayer, "id" | "name">;

export type IToken = "red" | "black";

export type IColumn = Array<IToken | null>;

export type IBoard = IColumn[];

export type IGame = {
  board: IBoard;
  players: [IPlayer, IPlayer];
  activePlayerId: string;
  status: "playing" | "matchNull" | "winner";
  winnerName: string;
};

export interface IMessage {
  user: string;
  text: string;
  time: string;
  id: string;
}

export type UpdateChatUsersGame = {
  status: "playing";
  users: IPlayer[];
};

export type UpdateChatUsersWaiting = {
  status: "waiting";
  users: IUser[];
};

export type UpdateChatUsers = UpdateChatUsersGame | UpdateChatUsersWaiting;

export type ThinkingMove = {
  index: number;
  token: IToken | null;
  display: boolean;
};

export type ClientToServerEvents = {
  setUpPlayer: (name: string) => void;
  startGame: () => void;
  playToken: (index: number) => void;
  resetGame: () => void;
  message: (message: string) => void;
  thinkingMove: (data: ThinkingMove) => void;
};

export type ServerToClientEvents = {
  assignUserId: (userId: string) => void;
  message: (message: IMessage) => void;
  updateChatUsers: (data: UpdateChatUsers) => void;
  play: (game: IGame) => void;
  invalidPlay: () => void;
  quitGame: () => void;
  thinkingMove: (data: ThinkingMove) => void;
};
