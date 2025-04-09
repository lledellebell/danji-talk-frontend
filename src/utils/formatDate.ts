export const formatDate = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffMin < 1) return '방금 전';
  if (diffHour < 1) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;

  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
