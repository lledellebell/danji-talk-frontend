export interface BoardItem {
  feedId: number;
  title: string;
  contents: string;
  nickName: string;
  localDateTime: string;
  views?: number;
  reactionCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  thumbnailFileUrl?: string;
}
