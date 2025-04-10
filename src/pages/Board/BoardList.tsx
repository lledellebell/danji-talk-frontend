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
import ArrowIcon from '../../assets/board/arrow.svg';
import Header from '../../layouts/Header';
import { useBoardData } from '../../hooks/useBoardData';
import { formatDate } from '../../utils/formatDate';
import { BoardItem } from '../../types/board';
import { useNavigate } from 'react-router-dom';

// TODO:  필터 셀렉트 박스 추가

const HeaderIcon = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexGrow: 0,
        flexShrink: 0,
        width: 24,
        height: 24,
        position: 'relative',
      }}
      preserveAspectRatio="none"
    >
      <path
        d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
        stroke="#C0C0C0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const BoardList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('최신순');
  const [sort, setSort] = useState('LATEST');

  const apartmentId = 1;
  const { data } = useBoardData(apartmentId, sort);

  const boardData: BoardItem[] = data?.feedDtoList || [];
  // if (isError) return <p>에러 발생: {error.message}</p>;

  const options = [
    { label: '전체', value: 'ALL' },
    { label: '인기순', value: 'POPULAR' },
    { label: '최신순', value: 'LATEST' },
  ];

  const handleSelect = (opt: { label: string; value: string }) => {
    setSelected(opt.label);
    setSort(opt.value);
    setIsOpen(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      <Header
        title="커뮤니티"
        type="sub"
        hasBackButton={true}
        hasIcons={true}
        iconComponent={<HeaderIcon />}
      />
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
              <div className={styles['select-box']}>
                <span
                  onClick={() => setIsOpen(!isOpen)}
                  className={styles['select-box__label']}
                >
                  {selected}
                  <img
                    src={ArrowIcon}
                    alt=""
                    className={`${styles['select-box__icon']} ${
                      isOpen ? styles['rotate'] : ''
                    }`}
                  />
                </span>

                {isOpen && (
                  <div className={styles['select-box__menu']}>
                    {options.map((opt) => (
                      <span
                        key={opt.value}
                        className={styles['select-box__menu-item']}
                        onClick={() => handleSelect(opt)}
                      >
                        {opt.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {boardData.map(
              ({
                feedId,
                title,
                contents,
                nickName,
                localDateTime,
                viewCount,
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
                        {viewCount ?? 0}
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
                </div>
              )
            )}
            <div
              className={styles['board__write-icon']}
              onClick={() => navigate('/write')}
            >
              <img src={writeIcon} alt="글쓰기" />
            </div>
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
