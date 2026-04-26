export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Rental {
  id: number;
  name: string;
  surface: number;
  price: number;
  picture: string;
  description: string;
  owner: User;
  created_at: string;
  updated_at: string;
}

export interface Message {
  rental_id: number;
  user_id: number;
  message: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateRentalRequest {
  name: string;
  surface: number;
  price: number;
  picture: File;
  description: string;
}

export interface UpdateRentalRequest {
  name?: string;
  surface?: number;
  price?: number;
  picture?: File;
  description?: string;
}
