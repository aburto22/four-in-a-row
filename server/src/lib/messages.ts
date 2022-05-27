import { v4 } from 'uuid';

export const createMessage = (username: string, text: string) => ({
  user: username,
  id: v4(),
  text,
  time: Date(),
});
