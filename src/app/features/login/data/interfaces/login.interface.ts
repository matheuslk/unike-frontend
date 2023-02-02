export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  type: string;
  token: string;
  refreshToken: string;
  expires_at: string;
}
