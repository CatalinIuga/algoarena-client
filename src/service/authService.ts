// service/authService.js
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";
import { apiURL } from "./config";

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await fetch(`${apiURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  var result;
  try {
    result = await response.json();
  } catch (e) {
    result = { message: "Failed to register" };
  }

  if (!response.ok) {
    if (result.message.includes("duplicate") && result.message.includes("@")) {
      throw new Error("Email already exists");
    } else if (result.message.includes("duplicate")) {
      throw new Error("Username already exists");
    }
    throw new Error("Failed to register");
  }

  return result;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
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

export const changeUserPassword = async (
  id: number,
  password: string,
  newPassword: string,
): Promise<any> => {
  const response = await fetch(`${apiURL}/auth/change_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password, newPassword }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
