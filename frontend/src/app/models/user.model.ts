export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  createdAt?: Date;
  lastActive?: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  fullName: string;
}