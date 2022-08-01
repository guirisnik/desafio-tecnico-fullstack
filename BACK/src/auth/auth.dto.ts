export type AuthRequest = {
  login: string;
  senha: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: "Bearer";
};
