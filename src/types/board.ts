export interface BoardItem {
  feedId: number;
  title: string;
  contents: string;
  nickName: string;
  localDateTime: string;
  views?: number;
  viewCount?: number;
  reactionCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  thumbnailFileUrl?: string;
}

interface CommentMember {
  memberId: number;
  nickname: string;
  fileId: string | null;
}

export interface Comment {
  commentId: number;
  feedId: number;
  contents: string;
  createdAt: string;
  commentMemberResponseDto: CommentMember;
  childrenCommentDto: Comment[];
}

export interface CommentListProps {
  comments: {
    content: Comment[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
