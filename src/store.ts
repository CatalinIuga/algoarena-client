// store/auth.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  checkAuth as checkAuthApi,
  login,
  register,
} from "./service/authService";
import { LoginRequest, RegisterRequest } from "./types/auth";

export const authStore = defineStore("auth", () => {
  // JWT token
  const token = ref<string>(localStorage.getItem("token") || "");

  // STATES
  const userId = ref<number>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const resetStates = () => {
    userId.value = undefined;
    isLoading.value = false;
    error.value = null;
  };

  const signIn = async (loginData: LoginRequest) => {
    resetStates();

    try {
      isLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await login(loginData);
      token.value = response.token;
      await checkAuth();
    } catch (err: any) {
      error.value = err.message;
      console.error(err.message);
    } finally {
      isLoading.value = false;
    }
  };

  const checkAuth = async () => {
    if (!token.value) return;
    resetStates();

    try {
      isLoading.value = true;
      const response = await checkAuthApi(token.value);
      userId.value = response.id;
    } catch (err) {
      console.error(err);
      error.value = "Failed to check auth";
      userId.value = undefined;
      token.value = "";
    } finally {
      isLoading.value = false;
    }
  };

  const signUp = async (registerData: RegisterRequest) => {
    resetStates();

    try {
      isLoading.value = true;
      const response = await register(registerData);
      token.value = response.token;
      await checkAuth();
    } catch (err: any) {
      error.value = err.message;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const signOut = async () => {
    resetStates();
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  watch(token, (newToken) => {
    localStorage.setItem("token", newToken);
  });

  return {
    userId,
    token,
    isLoading,
    error,
    signIn,
    signOut,
    signUp,
    checkAuth,
  };
});
