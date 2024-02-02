// service/authService.js
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

const apiURL = import.meta.env.VITE_API_URL;

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${apiURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

export const checkAuth = async (token: string): Promise<any> => {
  const response = await fetch(`${apiURL}/auth/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to check auth");
  }

  return response.json();
};
