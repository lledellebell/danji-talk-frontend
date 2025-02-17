export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
} 