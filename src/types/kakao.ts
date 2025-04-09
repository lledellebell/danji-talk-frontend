export interface KakaoAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    login: (options: {
      success: (response: KakaoAuthResponse) => void;
      fail: (error: Error) => void;
    }) => void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
} 