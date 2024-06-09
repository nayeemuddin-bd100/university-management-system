export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  refreshToken?: string;
  accessToken: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
