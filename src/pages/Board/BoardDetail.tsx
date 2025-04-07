import { useParams } from 'react-router-dom';
import { useBoardDetail } from '../../hooks/useBoardDetail';
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

export const BoardDetail = () => {
  const { feedId } = useParams();
  const { data, isLoading } = useBoardDetail(Number(feedId));

  if (isLoading) return <div>로딩중</div>;

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
        <div className={styles['comment-container']}>
          <span>댓글(22)</span>
          <div className={styles['comment-body-container']}>
            <div className={styles['comment-header']}>
              <div className={styles['comment-info']}>
                <img
                  className={styles['comment-profile-img']}
                  src={profileIcon}
                  alt="프로필"
                />
                <div className={styles['comment-author']}>
                  <span className={styles['comment-name']}>한예빈</span>
                  <span className={styles['comment-time']}>3시간 전</span>
                </div>
              </div>
              <img src={moreVerticalIcon} alt="더보기" />
            </div>

            <div className={styles['comment-body']}>
              정말 유익한 정보네요! 너무 감사합니다. 저도 사용법을 잘 몰랐는데,
              다음에 한 번 사용해봐야겠어요.
            </div>
            <div className={styles['comment-footer']}>댓글쓰기</div>
          </div>
        </div>
        <div className={styles['reply-container']}>
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
                  <span className={styles['reply-name']}>김지수</span>
                  <span className={styles['reply-time']}>방금 전</span>
                </div>
              </div>
              <img src={moreVerticalIcon} alt="더보기" />
            </div>

            <div className={styles['reply-body']}>
              저도 이번에 알았어요. 굿굿!!
            </div>
            <div className={styles['reply-footer']}>댓글쓰기</div>
          </div>
        </div>
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
