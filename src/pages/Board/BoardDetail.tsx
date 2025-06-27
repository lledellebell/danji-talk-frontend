import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardDetail } from '../../hooks/useBoardDetail';
import { useCommentList } from '../../hooks/useCommentList';
import { useReaction } from '../../hooks/useReaction';
import { useBookMark } from '../../hooks/useBookMark';
import { useDeleteBoard } from '../../hooks/useDeleteBoard';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import { useAddComment } from '../../hooks/useAddComment';
import { CommentListProps } from '../../types/board';
import { useNavigate } from 'react-router-dom';
import eyeIcon from '../../assets/board/eye.svg';
import commentIcon from '../../assets/board/comment.svg';
import favoriteEmptyIcon from '../../assets/board/favorite-empty.svg';
import favoriteFilledIcon from '../../assets/board/favorite-filled.svg';
import heartEmptyIcon from '../../assets/board/heart-empty.svg';
import heartFilledIcon from '../../assets/board/heart-filled.svg';
import replyIcon from '../../assets/board/reply.svg';
import moreVerticalIcon from '../../assets/board/moreVertical.svg';
import profileIcon from '../../assets/board/profile.svg';
import { formatDate } from '../../utils/formatDate';
import Header from '../../layouts/Header';
import styles from './BoardDetail.module.scss';
import { useEditComment } from '../../hooks/useEditComment';
import { useSendChatRequest } from '../../hooks/useSendChatRequest';
import { usePostViewCount } from '../../hooks/usePostViewCount';
import Alert from '../../components/common/Alert/ChatAlert';
import ContentAlert from '../../components/common/Alert/ContentAlert';

interface CommentMember {
  memberId: number;
  nickname: string;
  fileId: string | null;
}

const HeaderIcon = ({
  feedId,
  isAuthor,
}: {
  feedId: number;
  isAuthor: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteBoard } = useDeleteBoard();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    deleteBoard(feedId);
  };

  return (
    <div className={styles['icon-menu']}>
      <div onClick={toggleMenu} className={styles['icon-menu__icon']}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={styles['icon-menu__menu']}>
          {isAuthor ? (
            <>
              <span
                className={`${styles['icon-menu__menu-item']} ${styles['icon-menu__menu-item-top']}`}
                onClick={() => {
                  navigate(`/write/${feedId}`);
                }}
              >
                수정
              </span>
              <span
                className={styles['icon-menu__menu-item']}
                onClick={handleDelete}
              >
                삭제
              </span>
            </>
          ) : (
            <span className={styles['icon-menu__menu-item']}>신고</span>
          )}
        </div>
      )}
    </div>
  );
};

interface BoardImageProps {
  s3List?: { fullUrl: string }[];
}

const BoardImage = ({ s3List }: BoardImageProps) => {
  return (
    <div className={styles['boardItem__footer-img']}>
      {s3List &&
        s3List.length > 0 &&
        s3List.map((img, idx) => (
          <img
            key={idx}
            src={img.fullUrl}
            alt={`첨부 이미지 ${idx}`}
            className={styles['boardItem__footer-img-preview']}
          />
        ))}
    </div>
  );
};

const CommentList = ({ comments, feedId }: CommentListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [replyTargetId, setReplyTargetId] = useState<number | undefined>(
    undefined
  );
  const [editTarget, setEditTarget] = useState<{
    commentId: number;
    feedId: number;
    contents: string;
  } | null>(null);

  const [newComment, setNewComment] = useState('');
  const { deleteComment } = useDeleteComment();
  const [isOpen, setOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const [selectedMember, setSelectedMember] = useState<CommentMember | null>(
    null
  );

  const { addComment } = useAddComment();
  const { editComment } = useEditComment();
  const { sendChatRequest } = useSendChatRequest();

  const toggleMenu = (commentId: number) => {
    setOpenMenuId((prev) => (prev === commentId ? null : commentId));
  };

  const handleDelete = (feedId: number, commentId: number) => {
    setOpenMenuId(null);
    deleteComment({ feedId, commentId });
  };

  const handleAddOrEditComment = () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    if (editTarget) {
      editComment(
        {
          feedId: editTarget.feedId,
          commentId: editTarget.commentId,
          contents: newComment,
        },
        {
          onSuccess: () => {
            setEditTarget(null);
            setNewComment('');
          },
        }
      );
    } else {
      addComment({
        feedId: Number(feedId),
        contents: newComment,
        parentId: replyTargetId,
      });

      setReplyTargetId(undefined);
      setNewComment('');
    }
  };

  const handleEdit = (feedId: number, commentId: number, contents: string) => {
    setOpenMenuId(null);
    setEditTarget({ feedId, commentId, contents });
    setNewComment(contents);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={styles['comment-container']}>
      {isOpen && (
        <Alert
          nickname={selectedMember?.nickname || ''}
          profile={selectedMember?.fileId || ''}
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={() => {
            setOpen(false);
            setAlertOpen(true);
          }}
        />
      )}
      {isAlertOpen && (
        <ContentAlert
          nickname={selectedMember?.nickname || ''}
          onClose={() => setAlertOpen(false)}
          onConfirm={(requestMessage) => {
            if (!selectedMember?.memberId) {
              return;
            }
            sendChatRequest({
              receiverId: selectedMember.memberId,
              message: requestMessage,
            });
            setAlertOpen(false);
          }}
        />
      )}
      <span>댓글({comments.totalElements})</span>
      {comments.content.map((comment) => (
        <div
          key={comment.commentId}
          className={styles['comment-body-container']}
        >
          <div className={styles['comment-header']}>
            <div className={styles['comment-info']}>
              <img
                className={styles['comment-profile-img']}
                src={profileIcon}
                alt="프로필"
                onClick={() => {
                  setSelectedMember(comment.commentMemberResponseDto);
                  setOpen(true);
                }}
              />
              <div className={styles['comment-author']}>
                <span className={styles['comment-name']}>
                  {comment.commentMemberResponseDto.nickname}
                </span>
                <span className={styles['comment-time']}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
            <div className={styles['reply-menu-wrapper']}>
              <img
                src={moreVerticalIcon}
                alt="더보기"
                onClick={() => toggleMenu(comment.commentId)}
                className={styles['reply-menu-icon']}
              />
              {openMenuId === comment.commentId && (
                <div className={styles['reply-menu']}>
                  {comment.isAuthor ? (
                    <>
                      <span
                        className={`${styles['reply-menu-item']} ${styles['reply-menu-item-top']}`}
                        onClick={() =>
                          handleEdit(
                            comment.feedId,
                            comment.commentId,
                            comment.contents
                          )
                        }
                      >
                        수정
                      </span>
                      <span
                        className={styles['reply-menu-item']}
                        onClick={() =>
                          handleDelete(comment.feedId, comment.commentId)
                        }
                      >
                        삭제
                      </span>
                    </>
                  ) : (
                    <span className={styles['reply-menu-item']}>신고</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles['comment-body']}>{comment.contents}</div>
          <button
            className={styles['comment-footer']}
            onClick={() => setReplyTargetId(comment.commentId)}
          >
            댓글쓰기
          </button>
          {comment.childrenCommentDto.length > 0 &&
            comment.childrenCommentDto.map((child) => (
              <div key={child.commentId} className={styles['reply-container']}>
                <div className={styles['reply-icon-container']}>
                  <img src={replyIcon} alt="답글 아이콘" />
                </div>
                <div className={styles['reply-body-container']}>
                  <div className={styles['reply-header']}>
                    <div className={styles['reply-info']}>
                      <img
                        className={styles['comment-profile-img']}
                        src={profileIcon}
                        alt="프로필"
                      />
                      <div className={styles['reply-author']}>
                        <span className={styles['reply-name']}>
                          {child.commentMemberResponseDto.nickname}
                        </span>
                        <span className={styles['reply-time']}>
                          {formatDate(child.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className={styles['reply-menu-wrapper']}>
                      <img
                        src={moreVerticalIcon}
                        alt="더보기"
                        onClick={() => toggleMenu(child.commentId)}
                        className={styles['reply-menu-icon']}
                      />
                      {openMenuId === child.commentId && (
                        <div className={styles['reply-menu']}>
                          {child.isAuthor ? (
                            <>
                              <span
                                className={`${styles['reply-menu-item']} ${styles['reply-menu-item-top']}`}
                                onClick={() =>
                                  handleEdit(
                                    child.feedId,
                                    child.commentId,
                                    child.contents
                                  )
                                }
                              >
                                수정
                              </span>
                              <span
                                className={styles['reply-menu-item']}
                                onClick={() =>
                                  handleDelete(child.feedId, child.commentId)
                                }
                              >
                                삭제
                              </span>
                            </>
                          ) : (
                            <span className={styles['reply-menu-item']}>
                              신고
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles['reply-body']}>{child.contents}</div>
                  <button
                    className={styles['reply-footer']}
                    onClick={() => setReplyTargetId(child.commentId)}
                  >
                    댓글쓰기
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
      <div className={styles['comment-input-container']}>
        <input
          ref={inputRef}
          type="text"
          placeholder="단지님, 댓글을 작성해보세요!"
          className={styles['comment-input']}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddOrEditComment();
          }}
        />
        <button onClick={handleAddOrEditComment}>
          {editTarget ? '수정' : '작성'}
        </button>
      </div>
    </div>
  );
};

export const BoardDetail = () => {
  const { feedId } = useParams();
  const { data, isLoading } = useBoardDetail(Number(feedId));
  const { data: commentList, isLoading: commentLoading } = useCommentList(
    Number(feedId)
  );
  const { postViewCount } = usePostViewCount();
  const [isReacted, setIsReacted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { postReaction, deleteReaction } = useReaction(Number(feedId));
  const { postBookMark, deleteBookMark } = useBookMark(Number(feedId));

  const hasPosted = useRef(false);

  useEffect(() => {
    if (data) {
      setIsReacted(data.isReacted);
      setIsBookmarked(data.isBookmarked);
    }
  }, [data]);

  useEffect(() => {
    if (!hasPosted.current && feedId) {
      postViewCount(Number(feedId));
      hasPosted.current = true;
    }
  }, [feedId]);

  const handleReaction = () => {
    if (isReacted) {
      deleteReaction(undefined, {
        onSuccess: () => setIsReacted(false),
      });
    } else {
      postReaction(undefined, {
        onSuccess: () => setIsReacted(true),
      });
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      deleteBookMark(undefined, {
        onSuccess: () => setIsBookmarked(false),
      });
    } else {
      postBookMark(undefined, {
        onSuccess: () => setIsBookmarked(true),
      });
    }
  };

  if (isLoading) return <div>로딩중</div>;
  if (commentLoading) return <div>로딩중</div>;

  return (
    <>
      <Header
        title={data.title}
        type="sub"
        hasBackButton={true}
        hasIcons={true}
        iconComponent={
          <HeaderIcon feedId={Number(feedId)} isAuthor={data.isAuthor} />
        }
      />
      <div className={styles['board']}>
        <div className={styles['boardItem']}>
          <div className={styles['boardItem__header']}>
            <div className={styles['boardItem__content']}>
              <span className={styles['boardItem__content-title']}>
                {data.title}
              </span>
            </div>
          </div>

          <div className={styles['boardItem__footer']}>
            <div className={styles['boardItem__footer-info']}>
              <span>작성자</span>
              <span>{data.feedMemberResponseDto.nickname}</span>
              <span>{formatDate(data.createdAt)}</span>
            </div>
            <div className={styles['boardItem__footer-icons-small']}>
              <img src={eyeIcon} alt="조회수" />
              <span className={styles['boardItem__footer-text']}>
                {data.viewCount ?? 0}
              </span>
              <img src={heartEmptyIcon} alt="좋아요" />
              <span className={styles['boardItem__footer-text']}>
                {data.reactionCount ?? 0}
              </span>
              <img src={favoriteEmptyIcon} alt="즐겨찾기" />
              <span className={styles['boardItem__footer-text']}>
                {data.bookmarkCount ?? 0}
              </span>
              <img src={commentIcon} alt="댓글" />
              <span className={styles['boardItem__footer-text']}>
                {data.commentCount ?? 0}
              </span>
            </div>
          </div>
          <div className={styles['boardItem__footer-content']}>
            {data.contents}
          </div>
          <BoardImage s3List={data.s3ObjectResponseDtoList} />
          <div className={styles['boardItem__footer-icons-large']}>
            <img
              src={isReacted ? heartFilledIcon : heartEmptyIcon}
              alt="좋아요"
              onClick={handleReaction}
            />
            <img
              src={isBookmarked ? favoriteFilledIcon : favoriteEmptyIcon}
              alt="즐겨찾기"
              onClick={handleBookmark}
            />
          </div>
          <hr />
        </div>
        <CommentList comments={commentList} feedId={feedId!} />
      </div>
    </>
  );
};
