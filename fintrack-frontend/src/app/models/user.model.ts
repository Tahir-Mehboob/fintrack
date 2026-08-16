export interface RegisterRequest{
    fullName: String;
    email: String;
    password: String;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface AuthResponse {
  token: string;
}