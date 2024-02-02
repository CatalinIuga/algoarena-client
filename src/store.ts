import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { check, login, register } from "./service/apiService";
import { LoginRequest, RegisterRequest } from "./types/auth";

export const authStore = defineStore("auth", () => {
  const userId = ref<number>(); // User ID
  const token = ref<string>(""); // JWT token

  const logIn = async (loginData: LoginRequest) => {
    try {
      const response = await login(loginData);
      token.value = response.token;
    } catch (error) {
      console.error(error);
      token.value = "";
    }
  };

  const checkAuth = async () => {
    if (token.value === "") return;
    try {
      const response = await check();
      userId.value = response.id;
    } catch (error) {
      console.error(error);
      userId.value = undefined;
      token.value = "";
    }
    console.log("Token changed to", token.value);
  };

  const signUp = async (registerData: RegisterRequest) => {
    try {
      const response = await register(registerData);
      token.value = response.token;
    } catch (error) {
      console.error(error);
      token.value = "";
    }
  };

  const logOut = () => {
    userId.value = undefined;
    token.value = "bruh";
  };

  watch(token, (newToken) => {
    console.log("Token changed to", newToken);

    localStorage.setItem("token", newToken);
  });

  return {
    userId,
    token,
    logIn,
    logOut,
    signUp,
    checkAuth,
  };
});
