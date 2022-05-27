export interface IUser {
  id: string;
  name: string;
}

export interface PlayTokenData {
  index: number,
  userId: string,
}

export interface MessageData {
  user: string,
  text: string,
}
