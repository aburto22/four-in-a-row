import formatDistance from 'date-fns/formatDistance';

export const formatTime = (timeMsgStr: string, currentTime: Date): string => {
  const date = new Date(timeMsgStr);
  return `${formatDistance(date, currentTime)} ago`;
};
