type RefreshTokenResponse = {
  access_token: string;
  tokey_type: string;
  expires_in: number;
};
type AuthToken = {
  refresh_token: string;
  access_token: string;
};

type AuthSuccessType = {
  access_token: string;
  refresh_token: string;
  tokeh_type: string;
  expires_in: number;
  user: User;
};

type User = {
  id: string;
  username: string;
  display_name: string;
  public_key: string;
  wrapped_private_key: string;
  pbkdf2_salt: string;
  created_at: string;
};

type RegisterDTO = {
  username: string;
  display_name: string;
  password: string;
  public_key: string;
  wrapped_private_key: string;
  pbkdf2_salt: string;
};

type LoginDTO = {
  password: string;
  username: string;
};

export type {
  RefreshTokenResponse,
  AuthToken,
  AuthSuccessType,
  User,
  RegisterDTO,
  LoginDTO,
};
