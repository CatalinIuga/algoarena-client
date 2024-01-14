import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore("auth", () => {
  const userId = ref<number>(); // User ID
  const token = ref<string>(); // JWT token

  return {
    userId,
    token,
  };
});
