import eyeIcon from '../../assets/board/eye.svg';
import commentIcon from '../../assets/board/comment.svg';
import favoriteIcon from '../../assets/board/favorite.svg';
import heartIcon from '../../assets/board/heart.svg';
import replyIcon from '../../assets/board/reply.svg';
import moreVerticalIcon from '../../assets/board/moreVertical.svg';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          flexGrow: 0,
          flexShrink: 0,
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'stretch',
            flexGrow: 0,
            flexShrink: 0,
            position: 'relative',
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          <p
            style={{
              flexGrow: 1,
              width: 342,
              fontSize: 16,
              fontWeight: 600,
              textAlign: 'left',
              color: '#111',
            }}
          >
            댓글 (22)
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            flexGrow: 0,
            flexShrink: 0,
            gap: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexGrow: 0,
              flexShrink: 0,
              position: 'relative',
              gap: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
                gap: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexGrow: 1,
                  position: 'relative',
                  gap: 4,
                }}
              >
                <p
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: 270,
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'left',
                    color: '#111',
                  }}
                >
                  한예빈
                </p>
                <p
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: 270,
                    fontSize: 12,
                    textAlign: 'left',
                    color: '#505050',
                  }}
                >
                  3시간 전
                </p>
              </div>
            </div>
            <p
              style={{
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: 350,
                fontSize: 14,
                textAlign: 'left',
                color: '#111',
              }}
            >
              <span
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: 350,
                  fontSize: 14,
                  textAlign: 'left',
                  color: '#111',
                }}
              >
                정말 유익한 정보네요! 너무 감사합니다.
              </span>
              <br />
              <span
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: 350,
                  fontSize: 14,
                  textAlign: 'left',
                  color: '#111',
                }}
              >
                저도 사용법을 잘 몰랐는데, 다음에 한 번 사용해봐야겠어요.
              </span>
            </p>
            <p
              style={{
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: 350,
                fontSize: 12,
                textAlign: 'left',
                color: '#505050',
              }}
            >
              댓글쓰기
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexGrow: 0,
              flexShrink: 0,
              position: 'relative',
              gap: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexGrow: 1,
                position: 'relative',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  position: 'relative',
                  gap: 8,
                }}
              >
                <img
                  style={{ flexGrow: 0, flexShrink: 0 }}
                  src="ellipse-11-3.png"
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexGrow: 1,
                    position: 'relative',
                    gap: 4,
                  }}
                >
                  <p
                    style={{
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      width: 238,
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#111',
                    }}
                  >
                    김지수
                  </p>
                  <p
                    style={{
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      width: 238,
                      fontSize: 12,
                      textAlign: 'left',
                      color: '#505050',
                    }}
                  >
                    방금 전
                  </p>
                </div>
              </div>
              <p
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: 318,
                  fontSize: 14,
                  textAlign: 'left',
                  color: '#111',
                }}
              >
                저도 이번에 알았어요. 굿굿!!
              </p>
              <p
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: 318,
                  fontSize: 12,
                  textAlign: 'left',
                  color: '#505050',
                }}
              >
                댓글쓰기
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexGrow: 0,
              flexShrink: 0,
              position: 'relative',
              gap: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
                gap: 8,
              }}
            >
              <img
                style={{ flexGrow: 0, flexShrink: 0 }}
                src="ellipse-11-2.png"
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexGrow: 1,
                  position: 'relative',
                  gap: 4,
                }}
              >
                <p
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: 270,
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'left',
                    color: '#111',
                  }}
                >
                  이혁준
                </p>
                <p
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: 270,
                    fontSize: 12,
                    textAlign: 'left',
                    color: '#505050',
                  }}
                >
                  방금 전
                </p>
              </div>
            </div>
            <p
              style={{
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: 350,
                fontSize: 14,
                textAlign: 'left',
                color: '#111',
              }}
            >
              222 동의합니다~ 유용한 정보였어요~
            </p>
            <p
              style={{
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: 350,
                fontSize: 12,
                textAlign: 'left',
                color: '#505050',
              }}
            >
              댓글쓰기
            </p>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};
