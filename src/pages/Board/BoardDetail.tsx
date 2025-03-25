import eyeIcon from '../../assets/board/eye.svg';
import commentIcon from '../../assets/board/comment.svg';
import favoriteIcon from '../../assets/board/favorite.svg';
import heartIcon from '../../assets/board/heart.svg';
import replyIcon from '../../assets/board/reply.svg';
import moreVerticalIcon from '../../assets/board/moreVertical.svg';
import profileIcon from '../../assets/board/profile.svg';

import styles from './BoardDetail.module.scss';

export const BoardDetail = () => {
  return (
    <div className={styles['board']}>
      <div className={styles['boardItem']}>
        <div className={styles['boardItem__header']}>
          <div className={styles['boardItem__content']}>
            <span className={styles['boardItem__content-title']}>
              무인 택배함 사용법 공유합니다!
            </span>
          </div>
        </div>

        <div className={styles['boardItem__footer']}>
          <div className={styles['boardItem__footer-info']}>
            <span>작성자</span>
            <span>박지훈</span>
            <span>24.11.12</span>
          </div>
          <div className={styles['boardItem__footer-icons-small']}>
            <img src={eyeIcon} alt="조회수" />
            <span className={styles['boardItem__footer-text']}>34</span>
            <img src={heartIcon} alt="좋아요" />
            <span className={styles['boardItem__footer-text']}>36</span>
            <img src={favoriteIcon} alt="즐겨찾기" />
            <span className={styles['boardItem__footer-text']}>77</span>
            <img src={commentIcon} alt="댓글" />
            <span className={styles['boardItem__footer-text']}>77</span>
          </div>
        </div>
        <div className={styles['boardItem__footer-content']}>
          안녕하세요, 입주한 지 얼마 안 돼서 무인 택배함 사용법을 몰라서 좀
          헤맸는데, 혹시 저처럼 모르시는 분들이 있을까 봐 정리해봅니다! 😊
          <br />
          <br />✅ <strong>무인 택배함 위치</strong>
          <br />
          101동 1층 입구 옆<br />
          103동 주차장 입구 옆<br />
          커뮤니티센터 1층 로비
          <br />
          <br />
          📌 <strong>사용 방법</strong>
          <br />
          1. 택배 도착 시 문자 또는 카카오톡 알림 확인
          <br />
          "래미안 강남 무인택배함 (103동) 택배 보관 완료. 인증번호 1234 입력 후
          수령 가능합니다."
          <br />
          2. 무인택배함 키오스크에서 "택배 찾기" 버튼 클릭
          <br />
          3. 📲 문자 또는 카톡에 있는 인증번호 입력
          <br />
          4. 🚪 자동으로 문이 열리면 택배 수령
          <br />
          5. 문을 닫고 사용 완료! 🎉
          <br />
          <br />
          ⚠️ <strong>유의사항</strong>
          <br />
          택배는 48시간 이내 수령 필수! (초과 시 반송 처리됨)
          <br />
          크기가 너무 큰 물건(가전제품 등)은 보관 불가
          <br />
          음식물, 동물 관련 제품 등은 보관 금지
          <br />
          택배 수령 후 문을 꼭 닫아주세요!
        </div>
        <div className={styles['boardItem__footer-icons-large']}>
          <img src={heartIcon} alt="좋아요" />
          <img src={favoriteIcon} alt="즐겨찾기" />
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
  );
};
