<p align="center">
  <img src="./src/assets/logo.svg" alt="단지톡 로고" width="100" />
</p>


# 단지톡 (DanjiTalk) - 아파트 커뮤니티 채팅 서비스

![image](https://github.com/user-attachments/assets/2447891f-6d52-4564-9112-c25d8a6bf361)

## 소개
단지톡은 아파트 주민들을 위한 커뮤니티 채팅 서비스입니다. 1:1 채팅과 단체 채팅을 통해 이웃 주민들과 소통할 수 있습니다.

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

### 채팅
- 채팅방 목록
  - 1:1 채팅방과 단체 채팅방 탭 구분
  - 채팅방 이름/상대방 이름 표시
  - 최근 메시지 및 시간 표시
  - 읽지 않은 메시지 수 배지 표시
  - 참여자 프로필 이미지 표시
- 채팅 요청
  - 받은 요청/보낸 요청 관리

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

## 기술 스택
- **프론트엔드 프레임워크**: React 18 + TypeScript + Vite
- **상태 관리**:
  - React Query v5 (서버 상태 관리)
  - Zustand (클라이언트 상태 관리)
- **스타일링**: SCSS Modules + CSS Variables
- **아키텍처 패턴**:
  - ViewModel 패턴 (비즈니스 로직과 UI 로직 분리)
  - 기능 중심 구조 (Feature-based Architecture)
- **테스트**: Jest + React Testing Library
- **API 통신**: Axios + 커스텀 클라이언트
- **코드 품질**: ESLint + Prettier + TypeScript strict 모드

## 시작하기

### 개발 환경 설정
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

### 브라우저 지원
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 아키텍처 및 프로젝트 구조

### 아키텍처 패턴
- **ViewModel 패턴**: API 통신 및 비즈니스 로직을 UI 로직과 분리
  - API 변경 영향 범위를 ViewModel 내부로 한정
  - 관심사 분리를 통한 코드 유지보수성 향상
  - 각 도메인별 ViewModel 클래스 구현

- **기능 중심 구조**: 도메인별로 관련 코드(models, hooks, types)를 그룹화
  - `auth`, `board`, `comment`, `user` 등 도메인별 모듈화
  - 관련 기능이 응집력 있게 구성되어 코드 탐색이 용이
  - 독립적인 도메인 개발 및 유지보수 가능

- **데이터 흐름**:
  1. ViewModel: API 통신 및 비즈니스 로직 처리
  2. React Query Hooks: 캐싱 및 상태 관리
  3. 컴포넌트: UI 렌더링 및 사용자 상호작용

- **상태 관리 전략**:
  - 서버 데이터: React Query (캐싱, 무효화, 자동 갱신)
  - UI 상태: 지역 상태 (useState, useReducer)
  - 전역 상태: Zustand (애플리케이션 전체 공유 상태)

- **에러 처리 전략**:
  - API 에러 일관된 형식으로 변환
  - ViewModel에서 일차적 에러 처리 및 메시지 생성
  - React Query에서 UI 관련 에러 처리 (토스트, 리다이렉트 등)

### 프로젝트 구조

```bash
src/
├── api/                          # API 통신 인프라
│   ├── client.ts                 # Axios 기반 HTTP 클라이언트
│   ├── endpoints.ts              # API 엔드포인트 중앙 관리
│   ├── types.ts                  # API 공통 타입 (응답, 오류 등)
│   └── index.ts                  # API 모듈 진입점
│
├── features/                     # 기능 도메인별 모듈
│   ├── auth/                     # 인증 관련 기능
│   │   ├── models/               # 인증 관련 ViewModel
│   │   │   └── AuthViewModel.ts  # 로그인, 회원가입 등 비즈니스 로직
│   │   ├── hooks/                # 인증 관련 React Query 훅
│   │   │   └── useAuth.ts        # 로그인, 회원가입 등 훅
│   │   ├── types.ts              # 인증 관련 타입 정의
│   │   └── index.ts              # 기능 내보내기
│   │
│   ├── board/                    # 게시판 관련 기능
│   │   ├── models/               # 게시판 관련 ViewModel
│   │   ├── hooks/                # 게시판 관련 React Query 훅
│   │   └── types.ts              # 게시판 관련 타입 정의
│   │
│   ├── comment/                  # 댓글 관련 기능
│   │   ├── models/               # 댓글 관련 ViewModel
│   │   ├── hooks/                # 댓글 관련 React Query 훅
│   │   └── types.ts              # 댓글 관련 타입 정의
│   │
│   └── user/                     # 사용자 관련 기능
│       ├── models/               # 사용자 관련 ViewModel
│       ├── hooks/                # 사용자 관련 React Query 훅
│       └── types.ts              # 사용자 관련 타입 정의
│
├── components/                   # 공통 UI 컴포넌트
│   ├── Button/                   # 버튼 컴포넌트
│   ├── Input/                    # 입력 컴포넌트
│   ├── Modal/                    # 모달 컴포넌트
│   └── ...                       # 기타 재사용 가능한 컴포넌트
│
├── pages/                        # 페이지 컴포넌트
│   ├── LoginPage/                # 로그인 페이지
│   ├── BoardPage/                # 게시판 페이지
│   ├── ProfilePage/              # 프로필 페이지
│   └── ...                       # 기타 페이지
│
├── layouts/                      # 레이아웃 컴포넌트
│   ├── MainLayout.tsx            # 주요 레이아웃 (헤더, 푸터, 네비게이션)
│   └── AuthLayout.tsx            # 인증 관련 페이지 레이아웃
│
├── stores/                       # 전역 상태 관리 (Zustand)
│   ├── authStore.ts              # 인증 관련 전역 상태
│   ├── themeStore.ts             # 테마 관련 전역 상태
│   └── ...                       # 기타 전역 상태
│
├── styles/                       # 전역 스타일
│   ├── variables.scss            # 색상, 크기 등 변수
│   ├── mixins.scss               # 믹스인
│   └── global.scss               # 전역 스타일
│
├── utils/                        # 유틸리티 함수
│   ├── date.ts                   # 날짜 관련 유틸리티
│   ├── format.ts                 # 포맷팅 유틸리티
│   └── validation.ts             # 유효성 검사 유틸리티
│
├── types/                        # 전역 타입 정의
│   ├── index.ts                  # 공통 타입 내보내기
│   └── global.d.ts               # 전역 타입 선언
│
├── App.tsx                       # 애플리케이션 루트 컴포넌트
└── main.tsx                      # 진입점
```

이 구조는 기능 중심(Feature-based) 아키텍처와 ViewModel 패턴을 기반으로 설계되었습니다. 각 기능 도메인은 `features` 디렉토리 아래에 독립적으로 구성되어 있으며, 비즈니스 로직(ViewModel)과 UI 로직(React Query hooks)이 명확히 분리되어 있습니다.

## 개발 가이드

### 새 기능 개발 흐름
1. **타입 정의**: 필요한 도메인 모델, 요청/응답 인터페이스 정의 (`types.ts`)
2. **ViewModel 구현**: API 통신 및 비즈니스 로직 구현 (`models/*.ts`)
3. **React Query 훅 개발**: ViewModel을 사용한 훅 구현 (`hooks/*.ts`) 
4. **UI 컴포넌트 개발**: 훅을 사용하여 UI 구현

### 코드 품질 유지
- **타입 안전성**: `any` 타입 사용 지양, 구체적인 인터페이스 정의
- **에러 처리**: 모든 비동기 작업에 try/catch 사용, 사용자 친화적 에러 메시지 제공
- **테스트 작성**: 비즈니스 로직에 대한 단위 테스트, UI 컴포넌트에 대한 통합 테스트
- **성능 최적화**: 불필요한 리렌더링 방지, 메모이제이션 활용

### ViewModel 규칙
- ViewModel은 상태를 직접 관리하지 않고, 순수한 비즈니스 로직만 담당
- 모든 에러는 명확한 에러 메시지로 변환하여 throw
- 싱글톤 패턴으로 인스턴스 제공 (전역 상태 공유 방지)
- API 통신은 항상 `src/api` 모듈의 클라이언트 사용

### React Query 훅 규칙
- `queryKey`는 일관된 형식으로 구성 (도메인명, ID, 매개변수 등)
- 낙관적 업데이트 적극 활용 (`setQueryData`)
- 적절한 캐시 무효화 전략 구현 (`invalidateQueries`)
- 에러 처리 및 로딩 상태 처리 로직 포함

## 컨벤션 및 협업 가이드

### 코드 컨벤션
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 스타일: CSS Module + SCSS
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 준수

### 협업 가이드
- 이슈 등록: GitHub Issues 사용
- PR 리뷰: 최소 1명 이상의 승인 필요
- 브랜치 전략: Git Flow
  - master: 프로덕션 브랜치
  - develop: 개발 브랜치
  - feature/*: 기능 개발
  - hotfix/*: 긴급 수정

## 보안 및 릴리스

### 보안 가이드
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

#### 자동화된 보안 관리
이 프로젝트는 다음과 같은 자동 보안 관리 시스템을 갖추고 있습니다:

1. **자동 취약점 감지**: Dependabot이 매주 의존성을 검사하고 보안 취약점 발견 시 PR 생성
2. **자동 패치 적용**: 중요하지 않은 패치 및 마이너 업데이트는 자동으로 병합됨
3. **고위험 취약점 자동 해결**: 높은 심각도의 보안 취약점은 자동으로 승인 및 병합됨
4. **일별 보안 스캔**: 매일 새로운 취약점을 확인하고 자동으로 업데이트 적용

필요한 경우 GitHub Actions 탭에서 '자동 보안 업데이트' 워크플로우를 수동으로 실행할 수 있습니다.

### 릴리스 가이드
릴리스는 GitHub Actions를 통해 자동화되어 있습니다.

#### 버전 업데이트 방법
1. PR을 master 또는 develop 브랜치에 머지하면 자동으로 버전이 업데이트됩니다.
2. PR에 다음 라벨 중 하나를 추가하여 버전 업데이트 타입을 지정할 수 있습니다:
   - `major`: 메이저 버전 업데이트 (1.0.0 → 2.0.0)
   - `feature`: 마이너 버전 업데이트 (1.0.0 → 1.1.0)
   - `bug`, `bugfix`, `fix`: 패치 버전 업데이트 (1.0.0 → 1.0.1)
3. 수동으로 버전을 업데이트하려면 GitHub Actions의 "버전 업데이트" 워크플로우를 실행하세요.

#### 릴리스 배포
1. 새로운 버전 태그가 생성되면 자동으로 릴리스가 생성됩니다.
2. 릴리스가 생성되면 자동으로 배포 워크플로우가 실행됩니다.
3. 수동으로 배포하려면 GitHub Actions의 "배포" 워크플로우를 실행하세요.

## API 문서
- API 문서: [링크]
- 웹소켓 이벤트 문서: [링크]
