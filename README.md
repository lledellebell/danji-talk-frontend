<p align="center">
  <img src="./src/assets/logo.svg" alt="단지톡 로고" width="100" />
</p>


# 단지톡 (DanjiTalk) - 아파트 커뮤니티 채팅 서비스

![image](https://github.com/user-attachments/assets/2447891f-6d52-4564-9112-c25d8a6bf361)

## 소개
단지톡은 아파트 주민들을 위한 커뮤니티 채팅 서비스입니다. 1:1 채팅과 단체 채팅을 통해 이웃 주민들과 소통할 수 있습니다.

## 기술 스택
- React + TypeScript + Vite
- SCSS Modules (스타일링)
- React Query (서버 상태 관리)
- Zustand (클라이언트 상태 관리)

## 주요 기능

### 커뮤니티
- 게시글 목록
  - 제목, 내용 미리보기
  - 작성자, 작성 시간
  - 조회수, 좋아요, 북마크, 댓글 수 표시
  - 썸네일 이미지 표시
- 게시글 상세
  - 게시글 내용 및 이미지
  - 좋아요/북마크 기능
  - 댓글/대댓글 기능
- 게시글 작성
  - 제목, 내용 입력
  - 다중 이미지 업로드

### 회원 관리
- 회원가입
  - 이메일 인증
  - 비밀번호 설정
  - 프로필 정보 입력
- 로그인
  - 이메일 로그인
  - 소셜 로그인 (카카오, 구글, 네이버)
  - 로그인 상태 유지
- 계정 찾기
  - 아이디 찾기
  - 비밀번호 재설정
- 회원 탈퇴
  - 비밀번호 확인
  - 탈퇴 전 주의사항 안내

### 채팅
- 채팅방 목록
  - 1:1 채팅방과 단체 채팅방 탭 구분
  - 채팅방 이름/상대방 이름 표시
  - 최근 메시지 및 시간 표시
  - 읽지 않은 메시지 수 배지 표시
  - 참여자 프로필 이미지 표시
- 채팅 요청
  - 받은 요청/보낸 요청 관리
  
### 프로필
- 프로필 정보
  - 프로필 이미지
  - 닉네임
  - 이메일
  - 상태 메시지
- 계정 관리
  - 개인정보 수정
  - 회원 탈퇴

### 기타
- 반응형 UI (모바일/태블릿 지원)
- 에러 처리 및 사용자 피드백
- 로딩 상태 표시

## 개발 환경 설정
```bash
# 패키지 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint

# 보안 취약점 업데이트
npm run security-update
```

## 보안 가이드
```bash
# 의존성 보안 취약점 확인
npm audit

# 보안 취약점 자동 업데이트
npm run security-update
```

취약점 알림이 발생했을 때:
1. Dependabot 알림을 확인하고 PR 승인
2. GitHub Actions 워크플로우를 통한 자동 업데이트 확인
3. 필요시 `npm run security-update` 명령어로 수동 업데이트

## 릴리스 가이드
릴리스는 GitHub Actions를 통해 자동화되어 있습니다.

### 버전 업데이트 방법
1. PR을 master 또는 develop 브랜치에 머지하면 자동으로 버전이 업데이트됩니다.
2. PR에 다음 라벨 중 하나를 추가하여 버전 업데이트 타입을 지정할 수 있습니다:
   - `major`: 메이저 버전 업데이트 (1.0.0 → 2.0.0)
   - `feature`: 마이너 버전 업데이트 (1.0.0 → 1.1.0)
   - `bug`, `bugfix`, `fix`: 패치 버전 업데이트 (1.0.0 → 1.0.1)
3. 수동으로 버전을 업데이트하려면 GitHub Actions의 "버전 업데이트" 워크플로우를 실행하세요.

### 릴리스 배포
1. 새로운 버전 태그가 생성되면 자동으로 릴리스가 생성됩니다.
2. 릴리스가 생성되면 자동으로 배포 워크플로우가 실행됩니다.
3. 수동으로 배포하려면 GitHub Actions의 "배포" 워크플로우를 실행하세요.

## 프로젝트 구조

```bash
src/
├── components/ # 재사용 가능한 컴포넌트
├── pages/ # 페이지 컴포넌트
├── services/ # API 통신 관련 로직
├── stores/ # 상태 관리
├── styles/ # 전역 스타일
└── types/ # TypeScript 타입 정의
```

## 컨벤션
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 스타일: CSS Module + SCSS
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 준수

## 브라우저 지원
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 협업 가이드
- 이슈 등록: GitHub Issues 사용
- PR 리뷰: 최소 1명 이상의 승인 필요
- 브랜치 전략: Git Flow
  - master: 프로덕션 브랜치
  - develop: 개발 브랜치
  - feature/*: 기능 개발
  - hotfix/*: 긴급 수정

## API 문서
- API 문서: [링크]
- 웹소켓 이벤트 문서: [링크]
