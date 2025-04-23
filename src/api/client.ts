import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// 기본 Axios 인스턴스 설정
const baseConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API 클라이언트 생성
export const createApiClient = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const axiosInstance = axios.create({
    ...baseConfig,
    ...config,
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      // 토큰이 필요한 경우 여기서 처리
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 에러 처리 로직
      if (error.response && error.response.status === 401) {
        // 인증 관련 에러 처리
        localStorage.removeItem('auth_token');
        // 로그인 페이지로 리다이렉트 등의 처리
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// 기본 API 클라이언트 인스턴스
export const apiClient = createApiClient();
