export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  refreshToken?: string;
  accessToken: string;
  needsPasswordChange: boolean;
};
