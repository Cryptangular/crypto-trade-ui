export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiError = {
  message: string;
  statusCode: number;
  error?: string;
};
