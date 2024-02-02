export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type AuthCheckResponse = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
};
