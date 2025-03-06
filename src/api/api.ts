interface KakaoLoginRequestBody {
  code: string;
  redirectUri: string;
}

export const kakaoLoginRequest = async (body: KakaoLoginRequestBody) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
