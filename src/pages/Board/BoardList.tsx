import { useState } from 'react';
import styles from './BoardList.module.scss';
import TabWrapper from '../../components/common/Tab/TabWrapper';
import TabPanel from '../../components/common/Tab/TabPanel';
import Tab from '../../components/common/Tab/Tab';
import eyeIcon from '../../assets/board/eye.svg';
import commentIcon from '../../assets/board/comment.svg';
import favoriteIcon from '../../assets/board/favorite.svg';
import heartIcon from '../../assets/board/heart.svg';
import writeIcon from '../../assets/board/write.svg';

const boardData = [
  {
    id: 1,
    title: '무인 택배함 사용법 공유합니다!',
    content:
      '안녕하세요, 입주한 지 얼마 안 돼서 무인 택배함 사용법을 몰라서 좀 헤맸는데, 혹시 저처럼 모르시는 분들이 있을까 봐 정리해봅니다! 😊',
    author: '박지훈',
    date: '2024.11.12',
    views: 109,
    likes: 20,
    favorites: 46,
    comments: 22,
  },
  {
    id: 2,
    title: '단지 내 주차 문제 해결 방안 논의',
    content:
      '최근 단지 내 주차 문제가 심각해지고 있습니다. 해결 방법을 함께 논의해보아요!',
    author: '김민지',
    date: '2024.11.10',
    views: 85,
    likes: 12,
    favorites: 30,
    comments: 15,
  },
  {
    id: 3,
    title: '지하 2층 주차 자리 너무 부족해요 ㅠㅠ',
    content:
      '저희 가구는 차가 한 대인데.. 주차 공간이 너무 협소한 것 같아요. 가구 당 차량 제한이 필요할 것 같습니다.',
    author: '김단지',
    date: '2024.11.12',
    views: 109,
    likes: 12,
    favorites: 30,
    comments: 15,
  },
];

export const BoardList = () => {
  const [activeTab, setActiveTab] = useState(0);

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
                id,
                title,
                content,
                author,
                date,
                views,
                likes,
                favorites,
                comments,
              }) => (
                <div key={id} className={styles['boardItem']}>
                  <div className={styles['boardItem__header']}>
                    <div className={styles['boardItem__content']}>
                      <span className={styles['boardItem__content-title']}>
                        {title}
                      </span>
                      <span className={styles['boardItem__content-text']}>
                        {content}
                      </span>
                    </div>
                    <img
                      src="src/assets/logo.svg"
                      alt="logo"
                      width={62}
                      height={62}
                    />
                  </div>

                  <div className={styles['boardItem__footer']}>
                    <div className={styles['boardItem__footer-info']}>
                      <span>작성자</span>
                      <span>{author}</span>
                      <span>{date}</span>
                    </div>
                    <div className={styles['boardItem__footer-icons']}>
                      <img src={eyeIcon} alt="조회수" />
                      <span className={styles['boardItem__footer-text']}>
                        {views}
                      </span>
                      <img src={heartIcon} alt="좋아요" />
                      <span className={styles['boardItem__footer-text']}>
                        {likes}
                      </span>
                      <img src={favoriteIcon} alt="즐겨찾기" />
                      <span className={styles['boardItem__footer-text']}>
                        {favorites}
                      </span>
                      <img src={commentIcon} alt="댓글" />
                      <span className={styles['boardItem__footer-text']}>
                        {comments}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className={styles['board__write-icon']}>
                    <img src={writeIcon} alt="글쓰기" />
                  </div>
                </div>
              )
            )}
          </div>
        </TabPanel>
      </TabWrapper>
    </div>
  );
};
