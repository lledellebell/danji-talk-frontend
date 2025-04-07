import { useState } from 'react';
import styles from './BoardList.module.scss';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';
import eyeIcon from '../../assets/board/eye.svg';
import commentIcon from '../../assets/board/comment.svg';
import favoriteEmptyIcon from '../../assets/board/favorite-empty.svg';
import heartEmptyIcon from '../../assets/board/heart-empty.svg';
import writeIcon from '../../assets/board/write.svg';
import { useBoardData } from '../../hooks/useBoardData';
import { formatDate } from '../../utils/formatDate';
import { BoardItem } from '../../types/board';
import { useNavigate } from 'react-router-dom';

// TODO: 조회수 , 필터 셀렉트 박스 추가

export const BoardList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const apartmentId = 1;
  const { data, isLoading, isError, error } = useBoardData(apartmentId);

  const boardData: BoardItem[] = data?.feedDtoList || [];
  // if (isError) return <p>에러 발생: {error.message}</p>;

  const navigate = useNavigate();
  return (
    <div>
      <TabWrapper ariaLabel="메뉴 탭">
        <Tab
          label="단지정보"
          index={0}
          isActive={activeTab === 0}
          onClick={() => setActiveTab(0)}
        />
        <Tab
          label="커뮤니티"
          index={1}
          isActive={activeTab === 1}
          onClick={() => setActiveTab(1)}
        />
        <Tab
          label="공지사항"
          index={2}
          isActive={activeTab === 2}
          onClick={() => setActiveTab(2)}
        />
        <Tab
          label="시설정보"
          index={3}
          isActive={activeTab === 3}
          onClick={() => setActiveTab(3)}
        />
        <TabPanel
          isActive={activeTab === 0}
          role="tabpanel"
          id="tabpanel-0"
          ariaLabelledby="tab-0"
        >
          <div>단지정보</div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 1}
          role="tabpanel"
          id="tabpanel-1"
          ariaLabelledby="tab-1"
        >
          <div className={styles['board']}>
            <div className={styles['board__header']}>
              <span className={styles['board__title']}>전체</span>
              <span>전체</span>
            </div>
            {boardData.map(
              ({
                feedId,
                title,
                contents,
                nickName,
                localDateTime,
                reactionCount,
                bookmarkCount,
                commentCount,
                thumbnailFileUrl,
              }) => (
                <div
                  key={feedId}
                  className={styles['boardItem']}
                  onClick={() => navigate(`/community/feed/${feedId}`)}
                >
                  <div className={styles['boardItem__header']}>
                    <div className={styles['boardItem__content']}>
                      <span className={styles['boardItem__content-title']}>
                        {title}
                      </span>
                      <span className={styles['boardItem__content-text']}>
                        {contents}
                      </span>
                    </div>
                    {thumbnailFileUrl && (
                      <img
                        src={thumbnailFileUrl}
                        alt="logo"
                        width={62}
                        height={62}
                      />
                    )}
                  </div>

                  <div className={styles['boardItem__footer']}>
                    <div className={styles['boardItem__footer-info']}>
                      <span>작성자</span>
                      <span>{nickName}</span>
                      <span>{formatDate(localDateTime)}</span>
                    </div>
                    <div className={styles['boardItem__footer-icons']}>
                      <img src={eyeIcon} alt="조회수" />
                      <span className={styles['boardItem__footer-text']}>
                        {'조회수'}
                      </span>
                      <img src={heartEmptyIcon} alt="좋아요" />
                      <span className={styles['boardItem__footer-text']}>
                        {reactionCount ?? 0}
                      </span>
                      <img src={favoriteEmptyIcon} alt="즐겨찾기" />
                      <span className={styles['boardItem__footer-text']}>
                        {bookmarkCount ?? 0}
                      </span>
                      <img src={commentIcon} alt="댓글" />
                      <span className={styles['boardItem__footer-text']}>
                        {commentCount ?? 0}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={styles['board__write-icon']}
                    onClick={() => navigate('/write')}
                  >
                    <img src={writeIcon} alt="글쓰기" />
                  </div>
                </div>
              )
            )}
          </div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 2}
          role="tabpanel"
          id="tabpanel-2"
          ariaLabelledby="tab-2"
        >
          <div>공지사항</div>
        </TabPanel>
        <TabPanel
          isActive={activeTab === 3}
          role="tabpanel"
          id="tabpanel-3"
          ariaLabelledby="tab-3"
        >
          <div>시설정보</div>
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
