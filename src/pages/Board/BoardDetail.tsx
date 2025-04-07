import { useParams } from 'react-router-dom';
import { useBoardDetail } from '../../hooks/useBoardDetail';
import { useCommentList } from '../../hooks/useCommentList';
import { CommentListProps } from '../../types/board';
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

const NotImage = () => {
  return (
    <div className={styles['not-image']}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles['not-image__icon']}
        preserveAspectRatio="none"
      >
        <path
          d="M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M19 8V2M16 5H22M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const HeaderIcon = () => {
  return (
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
  );
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className={styles['comment-container']}>
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
              />
              <div className={styles['comment-author']}>
                <span className={styles['comment-name']}>
                  {comment.commentMemberResponseDto.nickname}
                </span>
                <span className={styles['comment-time']}>3시간 전</span>
              </div>
            </div>
            <img src={moreVerticalIcon} alt="더보기" />
          </div>
          <div className={styles['comment-body']}>{comment.contents}</div>
          <div className={styles['comment-footer']}>댓글쓰기</div>
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
                        <span className={styles['reply-time']}>방금 전</span>
                      </div>
                    </div>
                    <img src={moreVerticalIcon} alt="더보기" />
                  </div>
                  <div className={styles['reply-body']}>{child.contents}</div>
                  <div className={styles['reply-footer']}>댓글쓰기</div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export const BoardDetail = () => {
  const { feedId } = useParams();
  const { data, isLoading } = useBoardDetail(Number(feedId));
  const { data: commentList, isLoading: commentLoading } = useCommentList(
    Number(feedId)
  );

  if (isLoading) return <div>로딩중</div>;
  if (commentLoading) return <div>로딩중</div>;

  return (
    <>
      <Header
        title={data.title}
        type="sub"
        hasBackButton={true}
        hasIcons={true}
        iconComponent={<HeaderIcon />}
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
              <span className={styles['boardItem__footer-text']}>34</span>
              <img src={heartEmptyIcon} alt="좋아요" />
              <span className={styles['boardItem__footer-text']}>36</span>
              <img src={favoriteEmptyIcon} alt="즐겨찾기" />
              <span className={styles['boardItem__footer-text']}>77</span>
              <img src={commentIcon} alt="댓글" />
              <span className={styles['boardItem__footer-text']}>77</span>
            </div>
          </div>
          <div className={styles['boardItem__footer-content']}>
            {data.contents}
          </div>
          <div className={styles['boardItem__footer-img']}>
            <NotImage />
          </div>
          <div className={styles['boardItem__footer-icons-large']}>
            <img
              src={data.isReacted ? heartFilledIcon : heartEmptyIcon}
              alt="좋아요"
            />
            <img
              src={data.isBookmarked ? favoriteFilledIcon : favoriteEmptyIcon}
              alt="즐겨찾기"
            />
          </div>
          <hr />
        </div>
        <CommentList comments={commentList} />
        <div className={styles['comment-input-container']}>
          <input
            type="text"
            placeholder="단지님, 댓글을 작성해보세요!"
            className={styles['comment-input']}
          />
        </div>
      </div>
    </>
  );
};
