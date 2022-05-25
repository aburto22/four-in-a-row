import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${formatDistanceToNow(date)} ago`;
};
