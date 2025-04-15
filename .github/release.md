# 릴리스 노트: ${version}

단지톡 ${version} 버전이 릴리스되었습니다.

## 다운로드
- [단지톡 앱 다운로드](${download_url})

## 설치 방법
1. 릴리스 파일(`release.zip`)을 다운로드합니다.
2. 압축을 풀고 웹 서버에 배포합니다.
3. 정적 웹 서버 설정:
   - 모든 요청을 `index.html`로 리다이렉트하도록 설정하세요.
   - 예시 Nginx 설정:
   ```nginx
   try_files $uri $uri/ /index.html;
   ```

## 주요 변경사항

${changelog}

## 알려진 이슈
- 이슈가 있다면 여기에 기록됩니다.

## 문제 해결
### 일반적인 문제
- **빌드 오류**: `npm install && npm run build` 명령을 실행해보세요.
- **의존성 오류**: `npm ci` 또는 `npm install --legacy-peer-deps`를 실행해보세요.
- **화면이 표시되지 않음**: 콘솔 오류를 확인하고 GitHub 이슈를 생성해주세요.

### 보안 취약점 발견 시
- `npm run security-update` 명령어로 취약한 의존성을 업데이트하세요.
- 최신 릴리스로 업그레이드하세요.

## 피드백
문제가 발생하거나 의견이 있으시면 GitHub 이슈를 생성해주세요. 